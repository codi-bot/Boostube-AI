import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Make sure to install: npm install axios
import axios from "axios";

export default function IdeasFinder() {
  const [niche, setNiche] = useState("");
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);

  const [particles, setParticles] = useState([]);

  useEffect(() => {
      document.title="AI Ideas Finder – Instantly Discover Viral & Creative Ideas"
    },[])
  

  // Create floating particles (same as homepage)
  useEffect(() => {
    const temp = [];
    for (let i = 0; i < 40; i++) {
      temp.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 2,
        dx: (Math.random() - 0.5) * 0.6,
        dy: (Math.random() - 0.5) * 0.6,
      });
    }
    setParticles(temp);

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => {
          let newX = p.x + p.dx;
          let newY = p.y + p.dy;
          if (newX < 0 || newX > window.innerWidth) p.dx *= -1;
          if (newY < 0 || newY > window.innerHeight) p.dy *= -1;
          return { ...p, x: newX, y: newY };
        })
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const removeParticle = (id) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  };

  // Function to fetch viral ideas from Gemini API
  const fetchIdeas = async () => {
    if (!niche.trim()) return;
    setLoading(true);
    setIdeas([]);

    try {
      const response = await axios.post(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
  {
    contents: [
      { role: "user", parts: [{ text: `Give me 10 viral YouTube ideas in the niche: ${niche}. Return them as a numbered list. Don't try to bold anything` }] }
    ]
  },
  {
    headers: {
      "Content-Type": "application/json",
            "x-goog-api-key": import.meta.env.VITE_API_KEY
    },
  }
);
      const text = response.data.candidates[0].content.parts[0].text;
      const ideasList = text.split(/\d+\.\s/).filter((i) => i.trim() !== "");
      setIdeas(ideasList);
    } catch (error) {
      console.error("Error fetching ideas:", error);
      setIdeas(["❌ Failed to fetch ideas. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col items-center justify-center px-6 pb-30">
      {/* Floating Background Particles */}
      <div className="absolute inset-0 z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            onClick={() => removeParticle(p.id)}
            className="absolute rounded-full bg-green-400 shadow-[0_0_15px_#00ff99] cursor-pointer"
            style={{
              top: p.y,
              left: p.x,
              width: p.size * 2,
              height: p.size * 2,
            }}
            whileHover={{ scale: 1.6 }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-bold text-white drop-shadow-[0_0_20px_#00ff99] z-10 animate-pulse"
      >
        YouTube Viral Ideas Finder
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="mt-4 text-lg md:text-xl text-white drop-shadow-[0_0_12px_#fff] text-center max-w-2xl z-10"
      >
        Discover trending and viral content ideas in seconds.  
        Simply enter your niche and let Boostube AI spark your creativity.
      </motion.p>

      {/* Input + Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="mt-10 flex flex-col items-center w-full max-w-md z-10"
      >
        <input
          type="text"
          placeholder="Enter your niche (e.g. Gaming, Cooking, Tech)..."
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          className="w-full p-4 rounded-xl bg-transparent border-2 border-green-400 text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:border-green-300 focus:ring-2 focus:ring-green-400 transition-all shadow-[0_0_15px_#00ff99]"
        />
        
        {/* Search Button */}
        <motion.button
          whileHover={{
            backgroundColor: "rgba(0,255,100,0.2)",
            boxShadow: "0 0 30px #00ff99",
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchIdeas}
          className="relative mt-6 px-8 py-3 border-2 border-green-400 text-white rounded-xl bg-transparent font-semibold transition-all duration-300 overflow-hidden"
        >
          <span className="relative z-10">
            {loading ? "Loading..." : "Search Ideas"}
          </span>
          <motion.span
            className="absolute inset-0 bg-green-400"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
            style={{ originX: 0 }}
          />
        </motion.button>
      </motion.div>

      {/* Results Section */}
      {ideas.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-10 max-w-2xl w-full bg-black bg-opacity-60 border-2 border-green-400 rounded-xl p-6 shadow-[0_0_25px_#00ff99] z-10"
        >
          <h2 className="text-2xl font-bold mb-4 text-green-400">🔥 Viral Ideas</h2>
          <ul className="space-y-3 text-left">
            {ideas.map((idea, idx) => (
              <li
                key={idx}
                className="p-3 rounded-md border border-green-400 bg-black bg-opacity-40 hover:bg-green-400 hover:text-black transition-all cursor-pointer shadow-[0_0_10px_#00ff99]"
              >
                {idx + 1}. {idea}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}

