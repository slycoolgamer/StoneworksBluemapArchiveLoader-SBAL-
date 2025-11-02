chrome.runtime.onMessage.addListener(async (message) => {
  if (message.type === "toggleFeature") {
    const { feature, enabled } = message;
    await toggleFeature(feature, enabled);
  }
});

async function toggleFeature(feature, enabled) {
  if (feature === "markers") {
    if (enabled) {
      await chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [
          {
            id: 1,
            priority: 1,
            action: { type: "redirect", redirect: { extensionPath: "/archive/markers.json" } },
            condition: {
              urlFilter: "https://map.stoneworks.gg/abex1/maps/abexilas/live/markers.json",
              resourceTypes: ["xmlhttprequest"]
            }
          }
        ],
        removeRuleIds: [1]
      });
    } else {
      await chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: [1] });
    }
  }

  if (feature === "settings") {
    if (enabled) {
      await chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [
          {
            id: 2,
            priority: 1,
            action: { type: "redirect", redirect: { extensionPath: "/archive/settings.json" } },
            condition: {
              regexFilter: "^https:\\/\\/map\\.stoneworks\\.gg\\/abex1\\/maps\\/abexilas\\/settings\\.json(\\?.*)?$",
              resourceTypes: ["xmlhttprequest"]
            }
          }
        ],
        removeRuleIds: [2]
      });
    } else {
      await chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: [2] });
    }
  }

  // Save current feature state
  const state = await chrome.storage.local.get("features") || {};
  state.features = state.features || {};
  state.features[feature] = enabled;
  await chrome.storage.local.set(state);
}
