import React, { useEffect, useState } from "react";
import Loader from "./components/Loader/Loader";
import "./App.css";

function App() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRandomQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://dummyjson.com/quotes");
      const data = await res.json();
      const randomIndex = Math.floor(Math.random() * data.quotes.length);

      // 6-second loading delay
      await new Promise((resolve) => setTimeout(resolve, 2500));

      setQuote(data.quotes[randomIndex]);
    } catch {
      setError("Failed to fetch quote. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const shareOnWhatsApp = () => {
    if (!quote) return;

    const text =
      `“${quote.quote}” — ${quote.author}\n\n` +
      `✨ Quote of the Day\n` +
      `📅 ${new Date().toLocaleDateString()}\n` +
      `🔗 Try it yourself: https://dummyjson.com/quotes\n` +
      `😊 Enjoyed this? Share it with someone who needs a boost today!`;

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="app">
      <h1 className="title">Quote of the Day</h1>
      <p className="subtitle">Discover wisdom that inspires</p>

      <div className="card">
        {loading && <Loader />}
        {error && (
          <>
            <p className="error">{error}</p>
            <button onClick={fetchRandomQuote}>Retry</button>
          </>
        )}
        {!loading && !error && quote && (
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

      <footer className="footer">Made with ❤️ for daily inspiration</footer>
    </div>
  );
}

export default App;
