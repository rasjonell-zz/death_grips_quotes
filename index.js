const polka = require("polka");
const fetch = require("node-fetch");

const URL =
  "https://gist.githubusercontent.com/rasjonell/8894daf43187d6af2043d6a53a6445b4/raw/5cd9c71c6ed03d986b8bf27d7845c3128b97ff70/quotes.json";

const getRandomQuote = async () => {
  const result = await fetch(URL);
  const unparsedQuotes = await result.text();
  const quotes = JSON.parse(unparsedQuotes);

  return quotes[Math.floor(Math.random() * quotes.length)];
};

polka()
  .get("/", (_req, res) => {
    res.writeHead(301, { location: "/quote" });
    res.end();
  })
  .get("/quote", async (req, res) => {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    const randomQuote = await getRandomQuote();

    const json = JSON.stringify({
      data: randomQuote
    });
    res.end(json);
  })
  .listen(4001, err => {
    if (err) throw err;
    console.log("> Running on localhost:4001");
  });
