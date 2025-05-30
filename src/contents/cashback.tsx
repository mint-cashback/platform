import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  css: ["font.css"],
}

const CashbackButton = () => {
  console.log("CASHBACKKKK")
  return (
    <>
      <div>
        <h1>Cashback</h1>
      </div>
    </>
  )
}

export default CashbackButton