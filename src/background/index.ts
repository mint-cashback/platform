export {};

console.log("background.ts");

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    const domain = new URL(tab.url).hostname;
    
    const fetchurl = `https://mint-cashback-backend.fly.dev/brands?domain=${domain}`;
    
    try {
      const response = await fetch(fetchurl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        const errorText = await response.text();
        console.error("Error response:", errorText);
        return;
      }
      
      const data = await response.json();
      console.log("Success! Data:", data);

      const error = data.error ? data.error : null;
      
      // Safely extract cashback with null checks
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
          }
        }
      });
      
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }
});