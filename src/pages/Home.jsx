import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation

function Home() {
  const [particles, setParticles] = useState(
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: 6 + Math.random() * 4,
      startY: Math.random() * 800,
    }))
  );

  const handleParticleClick = (id) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  };

  const navigate = useNavigate(); // ✅ Hook for navigation

  const tools = [
    { name: "YouTube Viral Idea Finder", route: "/ideas-finder" },
    { name: "YouTube Script Writer", route: "/script-writer" },
    { name: "Keyword Checker", route: "/keyword-checker" },
    { name: "Title Generator", route: "/title-generator" },
  ];

  return (
<div className=" min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden pt-40 pb-30">      {/* Floating Neon Particles */}
      <div className="absolute w-full h-full overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: p.startY }}
            animate={{ y: [-50, 800] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
            }}
            onClick={() => handleParticleClick(p.id)}
            className="absolute w-2 h-2 rounded-full bg-green-400 opacity-80 blur-sm cursor-pointer"
            style={{ left: p.left }}
            whileHover={{ scale: 1.8, boxShadow: "0 0 12px #00ff99" }}
          />
        ))}
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-6xl font-extrabold text-white drop-shadow-[0_0_25px_#00ff99] animate-pulse"
      >
        <motion.span
          animate={{
            textShadow: [
              "0 0 10px #00ff99",
              "0 0 25px #00ff99",
              "0 0 10px #00ff99",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
        >
Boostube AI
        </motion.span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-4 text-xl text-white drop-shadow-[0_0_15px_#00ff99] text-center"
      >
        Supercharge your YouTube Channel Growth with our AI-Powered Tools For Free.
      </motion.p>

      {/* Tool Buttons with Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg w-full mt-12"
      >
        {tools.map((tool, i) => (
          <motion.button
  key={i}
  onClick={() => navigate(tool.route)} // ✅ Route navigation
  whileHover={{
    scale: 1.12,
    boxShadow: "0 0 25px #00ff99, 0 0 50px #00ff99",
  }}
  whileTap={{ scale: 0.9 }}
  className="relative w-[85%] sm:w-full max-w-xs py-3 rounded-2xl border border-green-400 text-white font-semibold 
             bg-transparent transition-all duration-500 ease-in-out 
             overflow-hidden group mx-auto"
>
  <span className="relative z-10">{tool.name}</span>
  {/* Neon Background Effect */}
  <span className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out"></span>
</motion.button>

        ))}
      </motion.div>

      {/* Info Section */}

      <div className="max-w-4xl mx-auto mt-16 px-6 text-center text-white mt-40"> <h2 className="text-3xl font-bold mb-6">Why Choose Boostube AI?</h2> <p className="text-lg leading-relaxed mb-6"> Boostube AI is your ultimate YouTube growth companion, built with cutting-edge artificial intelligence to help you dominate the world’s biggest video platform. Whether you’re a beginner dreaming of starting your channel or a seasoned creator looking to break through the competition, Boostube AI equips you with powerful, easy-to-use tools that take the guesswork out of YouTube success. </p> <p className="text-lg leading-relaxed mb-6"> Our platform combines creativity with advanced analytics to give you everything you need in one place: trending video ideas, perfectly written scripts, SEO-optimized keywords, and click-worthy titles. Every tool is designed to save you time, boost your confidence, and make your content stand out in a crowded space. </p> <p className="text-lg leading-relaxed mb-6"> What makes Boostube AI unique is the balance between simplicity and power. While our AI is highly advanced under the hood, we’ve built the interface to be intuitive and user-friendly—so you don’t need to be a tech expert to get professional results. With just a few clicks, you can unlock new content opportunities and grow faster than ever. </p> <p className="text-lg leading-relaxed mb-6"> Boostube AI is more than just a tool—it’s your creative partner. It helps you stay motivated by constantly providing fresh ideas and solutions. Instead of struggling to come up with content or worrying about the right titles, you can focus on what you do best: creating videos and engaging your audience. </p> <p className="text-lg leading-relaxed mb-6"> Join the future of YouTube growth today. With Boostube AI by your side, you’ll never run out of inspiration, never waste time guessing what works, and always stay ahead of the curve. Whether your goal is to go viral, build a loyal community, or turn YouTube into a career, Boostube AI is here to make it happen. </p> <p className="text-xl font-semibold mt-8 text-green-400"> Boost your creativity. Boost your growth. Boost your channel—with Boostube AI. </p> </div> </div> ) } export default Home


