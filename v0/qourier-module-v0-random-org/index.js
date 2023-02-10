import * as RandomOrg from "@randomorg/core";
import * as dotenv from "dotenv";
dotenv.config();

const rand = async () => {
  const roc = new RandomOrg.RandomOrgClient(process.env.RANDOM_ORG_KEY || "");
  const rnd = await roc.generateIntegers(1, 1, 1e9);
  return rnd.join("");
};

export default rand;
