import { Link, useLocation } from "react-router-dom";
import { Home, BarChart3, Quote, Vote } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/progress", label: "Progress", icon: BarChart3 },
    { path: "/quotes", label: "Quotes", icon: Quote },
    { path: "/voting", label: "Voting", icon: Vote },
  ];

  return (
    <nav className="bg-white border-b-2 border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center text-lg font-bold text-primary-600"
            >
              <img src="/logo.svg" alt="Logo" className="h-8 mr-2" />
              <span>TaDevOpsit</span>
            </Link>
          </div>
          <div className="flex space-x-4">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`inline-flex items-center px-4 pt-1 text-sm font-medium border-b-2 transition-colors ${
                  location.pathname === path
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
