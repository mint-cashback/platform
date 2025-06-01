import { useEffect, useState } from "react";

import { getAffiliateLink, getActiveTab } from "@/lib/utils/extension";

import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface OfferData {
  name: string | null;
  image: string | null;
  error: string | null;
}

interface CurrentOffer {
  url: string;
  domain: string;
  cashback: number | null;
  data: OfferData;
}

export default function OffersPage() {
  const [currentOffer, setCurrentOffer] = useState<CurrentOffer | null>(null);
  const [isClaimed, setIsClaimed] = useState(false);

  useEffect(() => {
    // Load initial data
    loadCurrentOffer();

    // Listen for storage changes
    const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }) => {
      if (changes.currentOffer) {
        setCurrentOffer(changes.currentOffer.newValue);
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  const loadCurrentOffer = async () => {
    try {
      const result = await chrome.storage.local.get(["currentOffer"]);
      if (result.currentOffer) {
        setCurrentOffer(result.currentOffer);
      }
    } catch (error) {
      console.error("Failed to load current offer:", error);
    }
  };

  const handleClaim = async () => {
    const email = await chrome.storage.local.get("email");
    const affiliateLink = await getAffiliateLink(currentOffer?.url || "", email.email || "");
    setIsClaimed(!isClaimed);
    const activeTab = await getActiveTab();
    if (affiliateLink) {
      chrome.tabs.update(activeTab.id || 0, { url: affiliateLink });
    }
  };

  const handleClaimRewards = () => {
    chrome.tabs.create({ url: "https://mintcashback.com/user" });
  };

  return (
    <div className="p-4">
      {currentOffer && !currentOffer.data.error ? (
        <div className="flex flex-col gap-4">
          <Card className="flex items-center gap-4 p-4 bg-card border border-border shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
              {currentOffer.data.image ? (
                <img
                  src={currentOffer.data.image}
                  alt={currentOffer.data.name || "Brand"}
                  className="object-contain w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-muted-foreground/10 rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground text-xs">No Image</span>
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="text-lg font-bold text-primary">
                {currentOffer.cashback}% back
              </div>
              <div className="text-base text-foreground font-medium">
                {currentOffer.data.name || currentOffer.domain}
              </div>
            </div>

            <Button
              onClick={handleClaim}
              className={`${isClaimed
                ? 'bg-background text-primary border border-primary hover:bg-accent'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
                } rounded-full px-6 py-2 font-medium`}
              variant={isClaimed ? "outline" : "default"}
            >
              {isClaimed ? 'Activated' : 'Activate'}
            </Button>
          </Card>

          <Button
            onClick={handleClaimRewards}
            variant="outline"
            className="flex items-center justify-center w-full h-12 gap-2 border border-border rounded-full shadow-sm bg-background hover:bg-accent"
          >
            <ExternalLink className="w-5 h-5 text-secondary" />
            <span className="text-lg text-secondary font-medium">Claim Rewards</span>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="text-xl text-foreground font-bold">No Active Offers</div>
          <div className="mt-2 text-base text-muted-foreground font-medium text-center">
            Visit a supported store to see cashback offers
          </div>
        </div>
      )}
    </div>
  );
}