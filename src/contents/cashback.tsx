import cssText from "data-text:../app/globals.css"
import { useMessage } from "@plasmohq/messaging/hook"
import { useState } from "react"

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

  console.log("CASHBACKKKK")
  return (
    <>
      <div>
        <h1 className="text-primary">Cashback</h1>
      </div>
    </>
  )
}

export default CashbackButton