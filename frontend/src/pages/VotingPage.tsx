import { useState, useEffect } from "react";
import { TrendingUp, Award } from "lucide-react";
import { type Tool } from "../types";
import { votingAPI } from "../api";

const VotingPage = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const data = await votingAPI.getAll();
      setTools(data);
    } catch (error) {
      console.error("Failed to fetch tools:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (id: number) => {
    try {
      const updatedTool = await votingAPI.vote(id);
      setTools((prev) => prev.map((t) => (t.id === id ? updatedTool : t)));
    } catch (error) {
      console.error("Failed to vote:", error);
    }
  };

  const categories = [
    "All",
    ...Array.from(new Set(tools.map((t) => t.category))),
  ];
  const filteredTools =
    selectedCategory === "All"
      ? tools
      : tools.filter((t) => t.category === selectedCategory);

  // Group tools by category for display
  const toolsByCategory = filteredTools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, Tool[]>);

  // Sort tools within each category by votes
  Object.keys(toolsByCategory).forEach((category) => {
    toolsByCategory[category].sort((a, b) => b.votes - a.votes);
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">Loading tools...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          DevOps Tool Voting
        </h1>
        <p className="text-gray-600 mb-6">
          Vote for your favorite DevOps tools and see what the community
          prefers!
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

      {/* Tools by Category */}
      <div className="space-y-8">
        {Object.entries(toolsByCategory).map(([category, categoryTools]) => (
          <div
            key={category}
            className="bg-white border-2 border-gray-200 rounded-2xl p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
              {category}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryTools.map((tool, index) => {
                const maxVotes = Math.max(...categoryTools.map((t) => t.votes));
                const percentage =
                  maxVotes > 0 ? (tool.votes / maxVotes) * 100 : 0;

                return (
                  <div
                    key={tool.id}
                    className="border-2 border-gray-200 rounded-xl p-4 hover:border-primary-300 transition-colors bg-white"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {index === 0 && (
                          <Award className="w-4 h-4 text-yellow-500 mr-1" />
                        )}
                        <h3 className="font-semibold text-gray-900">
                          {tool.name}
                        </h3>
                      </div>
                      <span className="text-sm font-medium text-primary-600">
                        {tool.votes} votes
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3 border border-gray-300">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <button
                      onClick={() => handleVote(tool.id)}
                      className="w-full bg-primary-600 text-white py-2 px-4 rounded-xl hover:bg-primary-700 transition-colors text-sm font-medium border border-primary-600"
                    >
                      Vote
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {Object.keys(toolsByCategory).length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No tools found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default VotingPage;
