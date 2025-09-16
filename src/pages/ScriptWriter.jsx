// src/pages/ScriptWriter.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ScriptWriter() {
  const [title, setTitle] = useState("");
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      document.title=" Script | Boostube AI"
    },[])
  

  // 🎇 Floating particles animation like homepage
  useEffect(() => {
    const canvas = document.getElementById("particles-canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
    }));

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 255, 0, 0.7)";
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      requestAnimationFrame(drawParticles);
    }
    drawParticles();

    // 💥 click to remove particles
    const handleClick = (e) => {
      particles = particles.filter(
        (p) => Math.hypot(p.x - e.clientX, p.y - e.clientY) > 20
      );
    };
    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, []);

  // 📝 Generate script with Gemini
  const generateScript = async () => {
    if (!title) return;
    setLoading(true);
    setScript("");

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
        {
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Write a detailed, engaging YouTube video script for the title: "${title}". Make it professional but entertaining, structured like an actual YouTube video. don't tru to bold anything in script`,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": import.meta.env.VITE_API_KEY
          },
        }
      );

      const output = response.data.candidates[0].content.parts[0].text;
      setScript(output);
    } catch (err) {
      console.error("Error fetching script:", err);
      setScript("❌ Failed to generate script. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-center bg-black text-white overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 z-0">
        <canvas id="particles-canvas"></canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl p-6">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white animate-pulse drop-shadow-[0_0_20px_#00FF00]">
          YouTube Script Writer
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl mb-8 text-white drop-shadow-[0_0_12px_#00FF00]">
          Turn your video ideas into full scripts instantly. <br />
          Professional, creative, and ready-to-record.
        </p>

        {/* Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your video title..."
          className="w-full p-4 mb-6 bg-transparent border border-green-400 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 shadow-[0_0_12px_#00FF00]"
        />

        {/* Button */}
        <button
          onClick={generateScript}
          disabled={loading}
          className="px-8 py-4 border border-green-400 text-white font-semibold rounded-xl 
                     transition-all duration-300 hover:bg-green-500 hover:text-black 
                     shadow-[0_0_15px_#00FF00] hover:shadow-[0_0_25px_#00FF00] disabled:opacity-50"
        >
          {loading ? "⏳ Generating Script..." : "⚡ Generate Script"}
        </button>

        {/* Script Output */}
        {script && (
          <div className="mt-10 p-6 bg-black/60 border border-green-500 rounded-xl shadow-[0_0_15px_#00FF00] text-left whitespace-pre-line animate-fadeIn">
            <h2 className="text-2xl font-bold mb-4 text-green-400">Your Script:</h2>
            <p className="leading-relaxed">{script}</p>
          </div>
        )}
      </div>
    </div>
  );
}
