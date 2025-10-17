import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Quiz from "./components/Quiz";

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} setUserId={setUserId} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quiz" element={token ? <Quiz token={token} userId={userId} /> : <Login setToken={setToken} setUserId={setUserId} />} />
      </Routes>
    </Router>
  );
}

export default App;
