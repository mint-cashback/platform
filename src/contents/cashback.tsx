import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["http://localhost:3000/*"],
  css: ["font.css"],
}

const PlasmoOverlay = () => {
  return (
    <div style={{
      position: "fixed",
      top: "20px",
      left: "20px",
      padding: "10px",
      backgroundColor: "rgba(0,0,0,0.8)",
      color: "white",
      fontSize: "16px",
      zIndex: 9999,
      borderRadius: "5px",
    }}>
      <p>
        Cashback with <span className="font-bold">Cashback</span>
      </p>
    </div>
  )
}

export default PlasmoOverlay