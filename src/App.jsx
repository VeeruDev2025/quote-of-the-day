import { useState, useEffect } from "react";
import Loader from "./components/Loader/Loader";
import "./App.css";

export default function App() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRandomQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://dummyjson.com/quotes");
      const data = await res.json();
      const idx = Math.floor(Math.random() * data.quotes.length);
      setQuote(data.quotes[idx]);
      console.log(res);
    } catch {
      setError("Failed to fetch quote. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function loadQuote() {
      await fetchRandomQuote();
    }
    loadQuote();
  }, []);

  const shareOnWhatsApp = () => {
    if (quote) {
      const text =
        `“${quote.quote}” — ${quote.author}\n\n` +
        `✨ *Quote of the Day*\n` +
        `📅 ${new Date().toLocaleDateString()}\n` +
        `🔗 *Try it yourself:* https://dummyjson.com/quotes` +
        `😊 *Enjoyed this? Share it with someone who needs a boost today!*`;

      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    }
  };

  return (
    <div className="app">
      <div className="background"></div>
      <div className="container">
        <h1>Quote of the Day</h1>
        <p className="subtitle">Discover wisdom that inspires</p>

        <div className="card">
          {loading && <Loader />}
          {error && (
            <>
              <p className="error">{error}</p>
              <button onClick={fetchRandomQuote}>Retry</button>
            </>
          )}
          {!loading && quote && (
            <>
              <p className="quote">“{quote.quote}”</p>
              <p className="author">— {quote.author}</p>
            </>
          )}
        </div>

        <div className="buttons">
          <button onClick={fetchRandomQuote} disabled={loading}>
            New Quote
          </button>
          <button onClick={shareOnWhatsApp} disabled={!quote || loading}>
            Share on WhatsApp
          </button>
        </div>

        <footer>Made with ❤️ for daily inspiration</footer>
      </div>
    </div>
  );
}
