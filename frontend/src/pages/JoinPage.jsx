import { useContext } from "react";
import { UserContext } from "../context/UserProvider.jsx";

const JoinPage = () => {
  const { username, setUsername } = useContext(UserContext);
  const { handleLogin, error } = useContext(UserContext);

  return (
    <div className="h-screen flex items-center justify-center relative overflow-hidden">
      <div className="fixed top-0 left-0 w-screen z-0">
        <svg viewBox="0 0 1440 320" className="w-full h-auto">
          <path
            fill="#a0e7e5"
            fillOpacity="0.3"
            d="M0,160L48,154.7C96,149,192,138,288,133.3C384,128,480,128,576,138.7C672,149,768,171,864,181.3C960,192,1056,192,1152,181.3C1248,171,1344,149,1392,138.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>
      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-white p-10 rounded-2xl shadow-2xl w-full max-w-sm flex flex-col items-center space-y-6 animate-fade-in-up"
      >
        <div className="flex flex-col items-center space-y-2">
          <svg
            className="w-12 h-12 text-teal-500 animate-pulse"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
          <h2 className="text-3xl font-extrabold text-gray-700">Chatio</h2>
          <p className="text-gray-400 text-sm text-center">
            Connect. Chat. Share moments.
          </p>
        </div>
        <div className="w-full space-y-4">
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-700 placeholder-gray-400 transition"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <p className="text-xs text-gray-400 text-center">
            Pick any name to start chatting
          </p>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-semibold shadow-md transition-all duration-300"
        >
          Join
        </button>
      </form>
      <div className="absolute bottom-4 text-gray-300 text-xs text-center w-full">
        Made By Swaydan
      </div>
    </div>
  );
};

export default JoinPage;
