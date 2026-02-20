import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Search, Gamepad2, Filter, Sparkles, Github } from "lucide-react";
import rawGamesData from "./games.json";
import { GameCard } from "./components/GameCard";
import { GameModal } from "./components/GameModal";

const gamesData = rawGamesData;

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeGame, setActiveGame] = useState(null);

  const categories = useMemo(() => {
    const cats = ["All", ...new Set(gamesData.map((g) => g.category))];
    return cats;
  }, []);

  const filteredGames = useMemo(() => {
    return gamesData.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-zinc-950 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20">
              <Gamepad2 size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-100">
              BENZEMO<span className="text-emerald-500">GAMES</span>
            </span>
          </div>

          <div className="hidden items-center gap-6 md:flex">
            <a href="#" className="text-sm font-medium text-zinc-400 transition-colors hover:text-emerald-500">Home</a>
            <a href="#" className="text-sm font-medium text-zinc-400 transition-colors hover:text-emerald-500">Trending</a>
            <a href="#" className="text-sm font-medium text-zinc-400 transition-colors hover:text-emerald-500">Categories</a>
            <div className="h-4 w-px bg-zinc-800" />
            <a href="#" className="flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-emerald-500">
              <Github size={16} />
              Source
            </a>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/5 p-8 md:p-12"
          >
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-[100px]" />
            <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px]" />
            
            <div className="relative z-10 max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-500">
                <Sparkles size={12} />
                New Games Added Weekly
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl">
                Play Without <br />
                <span className="text-emerald-500">Boundaries.</span>
              </h1>
              <p className="mt-6 text-lg text-zinc-400">
                A curated collection of the best unblocked web games. No ads, no tracking, just pure entertainment.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Search and Filters */}
        <section className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 py-3 pl-12 pr-4 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <Filter size={16} className="text-zinc-500 mr-2" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20"
                    : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Game Grid */}
        <section>
          {filteredGames.length > 0 ? (
            <div className="game-grid">
              {filteredGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onPlay={(g) => setActiveGame(g)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 rounded-full bg-zinc-900 p-6 text-zinc-700">
                <Search size={48} />
              </div>
              <h3 className="text-xl font-semibold text-zinc-300">No games found</h3>
              <p className="mt-2 text-zinc-500">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-6 text-sm font-medium text-emerald-500 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-white/5 bg-zinc-900/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-zinc-950">
                <Gamepad2 size={18} />
              </div>
              <span className="text-lg font-bold tracking-tight text-zinc-100">
                BENZEMO<span className="text-emerald-500">GAMES</span>
              </span>
            </div>
            <p className="text-sm text-zinc-500">
              © 2026 Benzemo Games. All rights reserved. Built for speed and accessibility.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-zinc-500 hover:text-emerald-500">Privacy</a>
              <a href="#" className="text-sm text-zinc-500 hover:text-emerald-500">Terms</a>
              <a href="#" className="text-sm text-zinc-500 hover:text-emerald-500">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Game Modal */}
      <GameModal
        game={activeGame}
        onClose={() => setActiveGame(null)}
      />
    </div>
  );
}
