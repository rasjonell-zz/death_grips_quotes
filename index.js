const polka = require("polka");
const fetch = require("node-fetch");

const URL =
  "https://gist.githubusercontent.com/rasjonell/8894daf43187d6af2043d6a53a6445b4/raw/a773b584e29bdf69a9592d397f67ee6c1d214b0d/quotes.json";

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
