chrome.webNavigation.onHistoryStateUpdated.addListener(async () => {
	const tabs = await chrome.tabs.query({
		url: ["*://*.youtube.com/watch?*"]
	});
	for (const tab of tabs) {
		chrome.tabs.sendMessage(tab.id, {name: "URL Changed"}).catch(() => {});
	}
});
