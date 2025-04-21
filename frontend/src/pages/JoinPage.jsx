import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

const JoinPage = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(username);
      localStorage.setItem("username", username);
      navigate("/chat");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4">Join the Chat</h2>
        <input
          type="text"
          className="w-full p-2 border rounded mb-2"
          placeholder="Enter a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Join
        </button>
      </form>
    </div>
  );
};

export default JoinPage;
