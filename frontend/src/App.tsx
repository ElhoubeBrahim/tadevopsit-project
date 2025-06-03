import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import ProgressPage from "./pages/ProgressPage";
import QuotesPage from "./pages/QuotesPage";
import VotingPage from "./pages/VotingPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/quotes" element={<QuotesPage />} />
            <Route path="/voting" element={<VotingPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
