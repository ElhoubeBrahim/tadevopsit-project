import { useState, useEffect } from "react";
import { Heart, Tag } from "lucide-react";
import { type Quote } from "../types";
import { quotesAPI } from "../api";

const QuotesPage = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const data = await quotesAPI.getAll();
      setQuotes(data);
    } catch (error) {
      console.error("Failed to fetch quotes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async (id: number) => {
    try {
      const updatedQuote = await quotesAPI.favorite(id);
      setQuotes((prev) => prev.map((q) => (q.id === id ? updatedQuote : q)));
    } catch (error) {
      console.error("Failed to favorite quote:", error);
    }
  };

  const categories = [
    "All",
    ...Array.from(new Set(quotes.map((q) => q.category))),
  ];
  const filteredQuotes =
    selectedCategory === "All"
      ? quotes
      : quotes.filter((q) => q.category === selectedCategory);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">Loading quotes...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          DevOps Quotes & Tips
        </h1>
        <p className="text-gray-600 mb-6">
          Wisdom from DevOps practitioners, industry leaders, and the community.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border-2 ${
                selectedCategory === category
                  ? "bg-primary-600 text-white border-primary-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-primary-300 hover:bg-primary-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Quotes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuotes.map((quote) => (
          <div
            key={quote.id}
            className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-primary-300 transition-all"
          >
            <blockquote className="text-gray-700 mb-4 text-lg leading-relaxed">
              "{quote.text}"
            </blockquote>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-medium">— {quote.author}</p>
                <div className="flex items-center mt-1">
                  <Tag className="w-3 h-3 text-primary-600 mr-1" />
                  <span className="text-sm text-primary-600">
                    {quote.category}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleFavorite(quote.id)}
                className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors group border border-gray-200 rounded-lg px-3 py-2 hover:border-red-300"
              >
                <Heart className="w-5 h-5 group-hover:fill-current" />
                <span className="text-sm">{quote.favorites}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredQuotes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No quotes found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default QuotesPage;
