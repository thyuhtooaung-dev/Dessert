import { motion, AnimatePresence } from "framer-motion";
import type { AddToCartProps } from "@/types";

export default function AddToCart({ count, setCount }: AddToCartProps) {
  return (
    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[160px] h-[48px] z-10">
      <AnimatePresence mode="wait">
        {count === 0 ? (
          <motion.button
            key="add-btn"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.1 }}
            onClick={() => setCount(1)}
            className="group flex items-center justify-center gap-2 w-full bg-white border border-rose-400 rounded-3xl px-4 py-2.5 cursor-pointer shadow-sm"
          >
            <img
              src="/images/icon-add-to-cart.svg"
              alt="cart icon"
              className={"size-5"}
            />
            <p className="font-medium group-hover:text-brand-red duration-300">
              Add to Cart
            </p>
          </motion.button>
        ) : (
          <motion.div
            key="quantity-selector"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-between bg-brand-red rounded-3xl px-4 py-2.5"
          >
            <button
              onClick={() => setCount((c: number) => Math.max(0, c - 1))}
              aria-label="Decrease quantity"
              className="group flex items-center justify-center w-5 h-5 border border-white rounded-full transition-all duration-200 hover:bg-white cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="2"
                viewBox="0 0 10 2"
                className="fill-white group-hover:fill-black transition-colors duration-200"
              >
                <path d="M0 0h10v2H0z" />
              </svg>
            </button>

            <span className="font-medium text-white tabular-nums">{count}</span>

            <button
              onClick={() => setCount((c: number) => c + 1)}
              aria-label="Increase quantity"
              className="group flex items-center justify-center w-5 h-5 border border-white rounded-full transition-all duration-200 hover:bg-white cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                className="fill-white group-hover:fill-black transition-colors duration-200"
              >
                <path d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
