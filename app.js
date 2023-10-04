const express = require("express");

const app = express();

app.use(express.json({ limit: "10kb" }));

app.use((req, res, next) => {
  console.log("Middleware called");
  next();
});

app.post("/convertFromLongToShort", async (req, res, next) => {
  const long_url = req.body.long_url;
  console.log(long_url);
  try {
    let response = await fetch("https://api-ssl.bitly.com/v4/shorten", {
      method: "POST",
      headers: {
        Authorization: "Bearer 53dc273e9a2ffcac0bc2f3c8697c1d54ed81d426",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        long_url,
        domain: "bit.ly",
      }),
    });
    response = await response.json();
    return res.status(200).json({ status: "success", shortUrl: response.id });
  } catch (err) {
    console.error(err);
  }
});

app.post("/convertFromShortToLong", async (req, res, next) => {
  let { shortUrl } = req.body;

  try {
    let response = await fetch(
      `https://api-ssl.bitly.com/v4/expand?shortUrl=${shortUrl}`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer 53dc273e9a2ffcac0bc2f3c8697c1d54ed81d426",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bitlink_id: shortUrl }),
      }
    );
    response = await response.json();
    return res
      .status(200)
      .json({ status: "success", ActualLink: response.long_url });
  } catch (err) {
    console.error(err);
    res.status(404).json({ status: "failed", err });
  }
});

module.exports = app;
