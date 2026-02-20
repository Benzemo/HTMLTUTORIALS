import React from "react";
import { motion } from "motion/react";
import { Play } from "lucide-react";

export const GameCard = ({ game, onPlay }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 transition-all hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60" />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">
              {game.category}
            </span>
            <h3 className="mt-1 text-lg font-semibold text-zinc-100">
              {game.title}
            </h3>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onPlay(game)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-zinc-950 shadow-lg transition-colors hover:bg-emerald-400"
          >
            <Play size={18} fill="currentColor" />
          </motion.button>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
          {game.description}
        </p>
      </div>
    </motion.div>
  );
};
