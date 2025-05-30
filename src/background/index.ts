export {};

console.log("background.ts");

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  console.log("onUpdated", tabId, changeInfo, tab);
  if (changeInfo.status === "complete" && tab.url) {
    const domain = new URL(tab.url).hostname;
    console.log("Domain:", domain);
    
    const fetchurl = `https://mint-cashback-backend.fly.dev/brands?domain=${domain}`;
    console.log("Fetching:", fetchurl);
    
    try {
      const response = await fetch(fetchurl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers.get('content-type'));
      
      // Check if the response is ok (status 200-299)
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        const errorText = await response.text();
        console.error("Error response:", errorText);
        return;
      }
      
      const data = await response.json();
      console.log("Success! Data:", data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }
});