import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  RefreshCw,
  Heart,
  Vote,
  BarChart3,
  Quote as QuoteIcon,
} from "lucide-react";
import { type Quote } from "../types";
import { quotesAPI } from "../api";

const HomePage = () => {
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRandomQuote = async () => {
    setLoading(true);
    try {
      const quote = await quotesAPI.getRandom();
      setRandomQuote(quote);
    } catch (error) {
      console.error("Failed to fetch quote:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async () => {
    if (!randomQuote) return;
    try {
      const updatedQuote = await quotesAPI.favorite(randomQuote.id);
      setRandomQuote(updatedQuote);
    } catch (error) {
      console.error("Failed to favorite quote:", error);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Master <span className="text-primary-600">DevOps</span> in 30 Days
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Join thousands of developers learning DevOps through our comprehensive
          30-day journey. From Docker to Kubernetes, CI/CD to Infrastructure as
          Code - we've got you covered!
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/progress"
            className="bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors inline-flex items-center border border-primary-600"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
          <Link
            to="/quotes"
            className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-primary-50 transition-colors"
          >
            Browse Quotes
          </Link>
        </div>
      </div>

      {/* Quote of the Day */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 mb-16 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Quote of the Day</h2>
          <button
            onClick={fetchRandomQuote}
            disabled={loading}
            className="flex items-center px-4 py-2 text-primary-600 hover:text-primary-700 transition-colors disabled:opacity-50 border border-gray-200 rounded-lg hover:border-primary-300"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            New Quote
          </button>
        </div>

        {randomQuote && (
          <div className="text-center">
            <blockquote className="text-xl text-gray-700 mb-4 italic">
              "{randomQuote.text}"
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <p className="text-gray-600">
                — {randomQuote.author}
                <span className="text-primary-600 ml-2 text-sm">
                  #{randomQuote.category}
                </span>
              </p>
              <button
                onClick={handleFavorite}
                className="flex items-center text-sm text-gray-500 hover:text-red-500 transition-colors border border-gray-200 rounded-lg px-3 py-1 hover:border-red-300"
              >
                <Heart className="w-4 h-4 mr-1" />
                {randomQuote.favorites}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8">
        <Link to="/progress" className="group">
          <div className="h-full bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-primary-500 hover:bg-primary-50 transition-all">
            <BarChart3 className="w-12 h-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
              Track Progress
            </h3>
            <p className="text-gray-600">
              Monitor your learning journey through our 30-day DevOps curriculum
              with detailed progress tracking.
            </p>
          </div>
        </Link>

        <Link to="/quotes" className="group">
          <div className="h-full bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-primary-500 hover:bg-primary-50 transition-all">
            <QuoteIcon className="w-12 h-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
              DevOps Wisdom
            </h3>
            <p className="text-gray-600">
              Get inspired by quotes and tips from industry leaders and DevOps
              practitioners.
            </p>
          </div>
        </Link>

        <Link to="/voting" className="group">
          <div className="h-full bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-primary-500 hover:bg-primary-50 transition-all">
            <Vote className="w-12 h-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
              Tool Voting
            </h3>
            <p className="text-gray-600">
              Vote for your favorite DevOps tools and see what the community is
              using most.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
