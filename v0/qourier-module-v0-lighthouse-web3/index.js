import lighthouse from "@lighthouse-web3/sdk";
import * as ethers from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

const PK = process.env.PRIVATE_KEY || "";
const privateKey = `0x${PK.replace(/^0x/, "")}`;
const signer = new ethers.Wallet(privateKey);
const publicKey = signer.address;
const apiKey = process.env.LIGHTHOUSE_KEY || "";

const signAuthMessage = async () => {
  const getAuthMessage = await lighthouse.getAuthMessage(publicKey);
  const messageRequested = getAuthMessage.data.message;
  const signedMessage = await signer.signMessage(messageRequested);
  return signedMessage;
};

// const getfileEncryptionKey = async (cid = "") => {
//   try {
//     const signedMessage = await signAuthMessage();
//     const result = await lighthouse.fetchEncryptionKey(
//       cid,
//       publicKey,
//       signedMessage
//     );
//     console.log("result", result);
//     return result.data.key;
//   } catch (error) {
//     console.log(error);
//   }
// };

const lh = async (shareAddress = "", minimum = 0, maximum = 0, cid = "") => {
  return new Promise(async (resolve, reject) => {
    var randomnumber =
      Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

    const signedMessage = await signAuthMessage();
    // const fileEncryptionKey = await getfileEncryptionKey(cid);

    if (cid) {
      const response = await lighthouse.shareFile(
        publicKey,
        [shareAddress],
        cid,
        signedMessage
      );
      // https://files.lighthouse.storage/viewFile/CID
      resolve(response.data.cid);
    } else {
      const response = await lighthouse.textUploadEncrypted(
        randomnumber.toString(),
        apiKey,
        publicKey,
        signedMessage
      );
      resolve(response.Hash);
    }
  });
};

export default lh;
