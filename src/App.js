import "./App.css";
import { useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import DealOrNoDeal from "./components/Games/DealOrNoDeal";
import TriviaGame from "./components/Games/TriviaGame";

function App() {
  const navigate = useNavigate();
  let cp = window.location.href;
  console.log("cp: ", cp.split("/"));
  useEffect(() => {
    if (cp.split("/")[4] === "") {
      navigate("/p1.html");
    }
  }, [cp]);
  return (
    <Routes>
      <Route path="/p1.html" element={<LandingPage />} />
      <Route path="deal-or-nodeal" element={<DealOrNoDeal />} />
      <Route path="trivia" element={<TriviaGame />} />
    </Routes>
  );
}

export default App;
