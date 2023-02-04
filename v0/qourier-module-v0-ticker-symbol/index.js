import https from "https";

const tick = async (ticker = "") => {
  var url = `https://api.binance.com/api/v3/ticker/price?symbol=${ticker}`;

  return new Promise(async (resolve, reject) => {
    https
      .get(url, (res) => {
        let body = "";

        res.on("data", (chunk) => {
          body += chunk;
        });

        res.on("end", () => {
          const { price } = JSON.parse(body);
          const [one, two] = price.split(".");
          const ether =
            (parseInt(one) ? parseInt(one) + "" : "") +
            parseInt(
              (two + "000000000000000000").split("").slice(0, 18).join("")
            );
          resolve(ether);
        });
      })
      .on("error", (e) => {
        resolve("");
      });
  });
};

export default tick;
