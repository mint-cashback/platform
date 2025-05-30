import type { PlasmoMessaging } from "@plasmohq/messaging";

const handler: PlasmoMessaging.PortHandler = async (req, res) => {
  console.log("OffersPort", req, res);
  res.send({
    message: "OffersPort",
  });
};

export default handler;