// Background service worker for Chrome extension

// Handle extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('Sideway Notepad extension installed');
});

// Handle action click to open sidepanel
chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    chrome.sidePanel.open({ tabId: tab.id });
  }
});

// Enable sidepanel for all tabs
chrome.tabs.onUpdated.addListener(async (_, __, tab) => {
  if (!tab.url) return;
  
  // Enable sidepanel for all http/https tabs
  if (tab.url.startsWith('http://') || tab.url.startsWith('https://')) {
    await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  }
});