chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [{
      id: 1,
      priority: 1,
      action: {
        type: "redirect",
        redirect: {
          extensionPath: "/archive/markers.json"
        }
      },
      condition: {
        urlFilter: "https://map.stoneworks.gg/abex1/maps/abexilas/live/markers.json",
        resourceTypes: ["xmlhttprequest"]
      }
    }],
    removeRuleIds: [1]
  });
});
