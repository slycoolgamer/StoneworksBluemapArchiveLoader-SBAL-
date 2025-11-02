document.addEventListener("DOMContentLoaded", async () => {
  const features = ["markers", "settings"];

  // Load saved state
  const stored = (await chrome.storage.local.get("features")).features || {};

  for (const feature of features) {
    const checkbox = document.getElementById(feature);
    checkbox.checked = stored[feature] || false;

    checkbox.addEventListener("change", () => {
      chrome.runtime.sendMessage({
        type: "toggleFeature",
        feature,
        enabled: checkbox.checked
      });
    });
  }
});
