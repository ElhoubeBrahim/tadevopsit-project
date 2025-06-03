import { useState, useEffect } from "react";
import { CheckCircle, Circle, MessageSquare, X } from "lucide-react";
import { type Progress } from "../types";
import { progressAPI } from "../api";

const ProgressPage = () => {
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const data = await progressAPI.getAll();
      setProgress(data);
    } catch (error) {
      console.error("Failed to fetch progress:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDayClick = (day: Progress) => {
    setSelectedDay(day.day);
    setFeedback(day.feedback || "");
  };

  const handleSave = async () => {
    if (!selectedDay) return;

    try {
      const updatedDay = await progressAPI.update(selectedDay, {
        completed: true,
        feedback: feedback.trim() || null,
      });

      setProgress((prev) =>
        prev.map((p) => (p.day === selectedDay ? updatedDay : p))
      );
      setSelectedDay(null);
      setFeedback("");
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  const handleToggleComplete = async (day: number, currentStatus: boolean) => {
    try {
      const updatedDay = await progressAPI.update(day, {
        completed: !currentStatus,
        feedback: null,
      });

      setProgress((prev) => prev.map((p) => (p.day === day ? updatedDay : p)));
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  const completedDays = progress.filter((p) => p.completed).length;
  const progressPercentage = (completedDays / 30) * 100;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">Loading progress...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Your DevOps Journey
        </h1>

        {/* Progress Overview */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Overall Progress</h2>
            <span className="text-2xl font-bold text-primary-600">
              {completedDays}/30 days
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 border border-gray-300">
            <div
              className="bg-primary-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {progressPercentage.toFixed(1)}% complete
          </p>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {progress.map((day) => (
            <div
              key={day.day}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-105 ${
                day.completed
                  ? "bg-green-50 border-green-300 hover:border-green-400"
                  : "bg-white border-gray-200 hover:border-primary-300"
              }`}
              onClick={() => handleDayClick(day)}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">
                  Day {day.day}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleComplete(day.day, day.completed);
                  }}
                  className="text-gray-400 hover:text-primary-600 transition-colors"
                >
                  {day.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </button>
              </div>

              {day.feedback && (
                <div className="mt-2">
                  <MessageSquare className="w-4 h-4 text-blue-500" />
                </div>
              )}

              {day.completed_at && (
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(day.completed_at).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Modal */}
      {selectedDay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white border-2 border-gray-300 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Day {selectedDay} - Share Your Learning
              </h3>
              <button
                onClick={() => setSelectedDay(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="What did you learn today? Any insights or challenges?"
              className="w-full p-3 border-2 border-gray-300 rounded-xl resize-none h-32 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-xl hover:bg-primary-700 transition-colors border border-primary-600"
              >
                Mark Complete
              </button>
              <button
                onClick={() => setSelectedDay(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors border-2 border-gray-300 rounded-xl hover:border-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressPage;
