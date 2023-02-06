import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

const PK = process.env.PRIVATE_KEY || "";
const Pkey = `0x${PK.replace(/^0x/, "")}`;
const signer = new ethers.Wallet(Pkey);

const push = async (
  notification_title = "",
  notification_body = "",
  payload_title = "",
  payload_body = ""
) => {
  return new Promise(async (resolve, reject) => {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 1,
      identityType: 0,
      notification: {
        title: notification_title,
        body: notification_body,
      },
      payload: {
        title: payload_title,
        body: payload_body,
        cta: "",
        img: "",
      },
      channel: `eip155:5:${signer.address}`,
      env: "staging",
    });
    resolve(apiResponse.status.toString());
  });
};

export default push;
