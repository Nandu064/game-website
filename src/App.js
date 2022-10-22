import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import DealOrNoDeal from "./components/Games/DealOrNoDeal";
function App() {
  return (
    <Routes>
      <Route path="/p1.html" element={<LandingPage />} />
      <Route path="deal-or-nodeal" element={<DealOrNoDeal />} />
    </Routes>
  );
}

export default App;
