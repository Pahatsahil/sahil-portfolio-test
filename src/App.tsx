import { Routes, Route } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import Resume from "./pages/Resume";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/resume" element={<Resume />} />
    </Routes>
  );
}

export default App;
