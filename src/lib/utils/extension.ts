import { sendToContentScript } from "@plasmohq/messaging";

export async function getAffiliateLink(url: string, email: string) {
  const fetchUrl = `https://mint-cashback-backend.fly.dev/brands/link?link=${url}&email=${email}`;
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

export async function checkDomain(domain: string) {
  const fetchUrl = `https://mint-cashback-backend.fly.dev/brands?domain=${domain}`;
  const response = await fetch(fetchUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function openCashbackPopup(affiliateLink: string) {
  sendToContentScript({
    name: "show-cashback",
    body: {
      affiliateLink: affiliateLink,
    }
  })
}