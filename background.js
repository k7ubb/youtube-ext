chrome.webNavigation.onHistoryStateUpdated.addListener(async () => {
	const tabs = await chrome.tabs.query({
		url: ["*://*.youtube.com/*"]
	});
	for (const tab of tabs) {
		chrome.tabs.sendMessage(tab.id, {}).catch(() => {});
	}
});
