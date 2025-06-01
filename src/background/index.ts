export {};

import { checkDomain, getAffiliateLink, openCashbackPopup } from "@/lib/utils/extension";

console.log("background.ts");

//I want to fetch the offer details and update the currentOffer in the storage
//when the tab is updated
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    const domain = new URL(tab.url).hostname;

    //Check if domain is in DB
    const data = await checkDomain(domain);
    
    const error = data.error ? data.error : null;
    
    const cashback = data.offers && Array.isArray(data.offers) && data.offers.length > 0 
      ? data.offers[0].commission 
      : null;

    //Update the currentOffer in the storage 
    chrome.storage.local.set({
        currentOffer: {
          url: tab.url, 
          domain: domain, 
          cashback: cashback,
          data: {
            name: data.name || null,
            image: data.image_url || null,
            error: error,
          }
        }
      });

      if (!error) {
        const email = await chrome.storage.local.get("email")
        const affiliateLink = await getAffiliateLink(tab.url, email.email)
        console.log(affiliateLink)
        openCashbackPopup(affiliateLink)
      }
  }
});

//I want to fetch the offer details and update the currentOffer in the storage
//when the tab is activated
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  
  if (!tab.url) return;
  
  const domain = new URL(tab.url).hostname;
  const data = await checkDomain(domain);
  
  const error = data.error ? data.error : null;
  const cashback = data.offers && Array.isArray(data.offers) && data.offers.length > 0 
    ? data.offers[0].commission 
    : null;
    
  chrome.storage.local.set({
    currentOffer: {
      url: tab.url,
      domain: domain,
      cashback: cashback,
      data: {
        name: data.name || null,
        image: data.image_url || null,
        error: error,
      },
    }
  });
});

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.name === "navigate-to-affiliate-link") {
    const { url } = message.body;
    if (sender.tab?.id && url) {
      chrome.tabs.update(sender.tab.id, { url: url });
      sendResponse({ success: true });
    } else {
      sendResponse({ success: false, error: "No tab ID or URL provided" });
    }
  }
});