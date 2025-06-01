export async function getAffiliateLink(url: string, email: string) {
  const fetchUrl = `https://www.mint-cashback-backend.fly.dev/brands/link?url=${url}&email=${email}`;
  try {
    const response = await fetch(fetchUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.link;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getActiveTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0];
}