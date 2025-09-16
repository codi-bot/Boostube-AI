import React, { useState, useEffect, useRef } from "react";

export default function TopKeywords() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [animatedScore, setAnimatedScore] = useState(0);
  const [arrowPos, setArrowPos] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    document.title=" Keyword Checker | Boostube AI"
  },[])

  // 🎇 Particle Background (infinite float + click to remove)
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 2;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.fillStyle = "rgba(0, 255, 0, 0.7)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 80; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    };

    const handleClick = (e) => {
      const clickX = e.clientX;
      const clickY = e.clientY;
      particles = particles.filter(
        (p) =>
          !(
            clickX >= p.x - p.size &&
            clickX <= p.x + p.size &&
            clickY >= p.y - p.size &&
            clickY <= p.y + p.size
          )
      );
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    };

    initParticles();
    animate();
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  // 🎯 Fetch Keyword Data
  const fetchKeywordData = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    setAnimatedScore(0);
    setArrowPos(0);

    try {
      const response = await fetch(`/api/keyword?k=${keyword}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setResult(data.keyword);

      // Animate score & arrow
      setTimeout(() => {
        setAnimatedScore(data.keyword.popularity_score);
        setArrowPos(getVolumePosition(data.keyword.search_volume));
      }, 200);
    } catch (error) {
      console.error("API Error:", error);
      setError("Failed to fetch keyword data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Map search volume to position
  const getVolumePosition = (volume) => {
    switch (volume.toLowerCase()) {
      case "low":
        return 20;
      case "medium":
        return 50;
      case "high":
        return 75;
      case "very high":
        return 95;
      default:
        return 0;
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden text-center flex flex-col items-center justify-center px-6">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>

      {/* Title + Description */}
      <h1 className="text-5xl font-extrabold text-white drop-shadow-[0_0_20px_#00ff99] animate-pulse z-10">
        Keyword Checker
      </h1>
      <p className="text-lg mt-4 text-white drop-shadow-[0_0_10px_rgba(0,255,0,0.7)] z-10">  
        Check Popularity Score and Search Volume of Your Keywords in just 1 click.
      </p>

      {/* Input + Button */}
      <div className="mt-8 flex flex-col items-center gap-4 z-10 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter a keyword..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="px-4 py-2 rounded-xl w-full text-center bg-transparent border-2 border-green-400 text-white placeholder-gray-400 focus:outline-none focus:border-green-300 shadow-[0_0_15px_rgba(0,255,0,0.7)]"
        />
        <button
          onClick={fetchKeywordData}
          disabled={loading}
          className="px-6 py-2 text-lg rounded-xl border-2 border-green-400 text-white transition-all duration-300 hover:bg-green-500 hover:text-black shadow-[0_0_15px_rgba(0,255,0,0.8)]"
        >
          {loading ? "Finding..." : "Find Keywords"}
        </button>
      </div>

      {/* Results */}
      <div className="mt-6 text-white z-10 max-w-xl">
        {error && <p className="text-red-400">{error}</p>}
        {result && (
          <div className="p-6 rounded-xl bg-black/70 border border-green-400 shadow-[0_0_20px_rgba(0,255,0,0.5)] animate-fadeIn space-y-6">
            <h2 className="text-2xl font-bold mb-2 text-green-400">{result.keyword}</h2>

            {/* Popularity Score */}
            <div className="flex flex-col items-center">
              <p className="mb-2 text-lg">📊 Popularity Score</p>
              <div className="relative flex justify-center items-center">
                <svg width="100" height="100" className="-rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#333"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="lime"
                    strokeWidth="10"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={
                      2 * Math.PI * 40 -
                      (animatedScore / 55) * (2 * Math.PI * 40)
                    }
                    style={{ transition: "stroke-dashoffset 1.5s ease-in-out" }}
                  />
                </svg>
                <span className="absolute text-lg font-bold">
                  {animatedScore}/55
                </span>
              </div>
            </div>

            {/* Search Volume */}
            <div>
<p className="mb-2 text-lg">🔎 Search Volume</p>
<div className="relative w-full h-6 rounded-lg bg-gradient-to-r from-red-500 via-yellow-400 to-green-500">
  <img
    src="/ArrowRed.png"  // 👉 replace with your image path
    alt="Indicator"
    className="absolute -top-4 w-5 h-5 transition-all duration-1000 ease-in-out"
    style={{
      left: `${arrowPos}%`,
      transform: "translateX(-50%)",
    }}
  />
</div>

              <p className="mt-2">{result.search_volume}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
