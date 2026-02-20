import { motion, AnimatePresence } from "motion/react";
import { X, Maximize2, RotateCcw } from "lucide-react";
import { useState } from "react";

export function GameModal({ game, onClose }) {
  const [key, setKey] = useState(0);

  const handleReload = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <AnimatePresence>
      {game && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/90 p-4 backdrop-blur-sm md:p-8"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-bottom border-zinc-800 bg-zinc-900/50 p-4 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 overflow-hidden rounded-lg">
                  <img src={game.thumbnail} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-zinc-100">{game.title}</h2>
                  <p className="text-xs text-zinc-500">{game.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleReload}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-100"
                  title="Reload Game"
                >
                  <RotateCcw size={18} />
                </button>
                <button
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 text-zinc-400 transition-colors hover:bg-red-500/20 hover:text-red-400"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Game Content */}
            <div className="relative flex-1 bg-black">
              <iframe
                key={key}
                src={game.iframeUrl}
                className="h-full w-full border-none"
                allow="autoplay; fullscreen; keyboard"
                title={game.title}
              />
            </div>

            {/* Footer / Controls */}
            <div className="flex items-center justify-between bg-zinc-900/50 p-4 text-xs text-zinc-500">
              <div className="flex items-center gap-4">
                <span>Press ESC to exit</span>
                <span className="h-1 w-1 rounded-full bg-zinc-700" />
                <span>Unblocked & Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Maximize2 size={14} />
                <span>Full Screen Mode</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
