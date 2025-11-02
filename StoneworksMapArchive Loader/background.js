chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [
      {
        id: 1,
        priority: 1,
        action: {
          type: "redirect",
          redirect: {
            extensionPath: "/archive/markers.json"
          }
        },
        condition: {
          // exact match for live markers.json requests
          urlFilter: "https://map.stoneworks.gg/abex1/maps/abexilas/live/markers.json",
          resourceTypes: ["xmlhttprequest"]
        }
      },
      {
        id: 2,
        priority: 1,
        action: {
          type: "redirect",
          redirect: {
            extensionPath: "/archive/settings.json"
          }
        },
        condition: {
          // use a regex so we match settings.json with or without a query string
          regexFilter: "^https:\\/\\/map\\.stoneworks\\.gg\\/abex1\\/maps\\/abexilas\\/settings\\.json(\\?.*)?$",
          resourceTypes: ["xmlhttprequest"]
        }
      }
    ],
    // remove any old rules with same ids (keeps things idempotent)
    removeRuleIds: [1, 2]
  });
});
