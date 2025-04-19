import { useState } from "react";
import JoinPage from "./pages/JoinPage";
import ChatRoom from "./pages/ChatRoom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ChatRoom username="sway"/>
    </>
  );
}

export default App;
