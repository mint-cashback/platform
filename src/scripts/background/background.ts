export {};

console.log("background.ts");

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    const domain = new URL(tab.url).hostname;
    const fetchurl = `https://mintcashback.com/brands?domain=${domain}`;
    const response = await fetch(fetchurl);
    const data = await response.json();
    console.log(data);
  }
});