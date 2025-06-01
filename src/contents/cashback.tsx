import { useMessage } from "@plasmohq/messaging/hook"
import { useState } from "react"

import cssText from "data-text:../app/globals.css"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  style.textContent = cssText.replaceAll(':root', ':host')
  return style
}

const CashbackButton = () => {
  const [showCashback, setShowCashback] = useState(false)
  const [affiliateLink, setAffiliateLink] = useState("")

  useMessage(async (req, res) => {
    if (req.name === "show-cashback") {
      setShowCashback(true)
      setAffiliateLink((req.body as { affiliateLink?: string })?.affiliateLink || "")
      res.send("Cashback UI shown")
    } else if (req.name === "hide-cashback") {
      setShowCashback(false)
      res.send("Cashback UI hidden")
    }
  })

  if (!showCashback) return null

  const handleClose = () => {
    setShowCashback(false)
  }

  const handleActivate = () => {
    if (affiliateLink) {
      chrome.runtime.sendMessage({
        name: "navigate-to-affiliate-link",
        body: { url: affiliateLink }
      });
    }
  }

  console.log("CASHBACKKKK")
  return (
    <>
      <div className="p-2 bg-background w-[350px] h-[120px] rounded-xl shadow-lg border">
        <div className="flex items-center justify-between -mt-1">
          <img src={chrome.runtime.getURL("assets/images/logos/mint.png")} alt="mint" className="w-7 h-7" />
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-col items-center text-center -mt-6 cursor-pointer" onClick={handleActivate}>
          <p className="text-lg font-bold text-foreground mb-0 cursor-pointer">Earn up to</p>
          <h1 className="text-4xl font-bold text-primary mb-0 leading-tight cursor-pointer">2% back</h1>
          <p className="text-sm text-muted-foreground font-medium cursor-pointer ">
            Click to Activate
          </p>
        </div>
      </div>
    </>
  )
}

export default CashbackButton