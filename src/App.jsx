import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import IdeasFinder from "./pages/IdeasFinder";
import ScriptWriter from "./pages/ScriptWriter";
import TitleGenerator from "./pages/TitleGenerator";
import TopKeywords from "./pages/TopKeywords";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ideas-finder" element={<IdeasFinder />} />
        <Route path="/script-writer" element={<ScriptWriter />} />
        <Route path="/title-generator" element={<TitleGenerator />} />
        <Route path="/keyword-checker" element={<TopKeywords />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
