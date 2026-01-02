import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import { useCart } from "@/context/CartContext.tsx";
import OrderConfirm from "@/components/OrderConfirm.tsx";

export default function Cart() {
  const { items, removeFromCart, clearCart, totalItems, totalPrice } =
    useCart();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleOrderReset = () => {
    setShowConfirm(false);
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (showConfirm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showConfirm]);

  return (
    <section className="w-full lg:mt-12">
      <div className="bg-white rounded-lg mx-6 flex flex-col gap-4 p-5">
        <h2 className="text-brand-red text-xl font-bold">
          Your Cart ({totalItems})
        </h2>

        <AnimatePresence mode="popLayout">
          {items.length === 0 ? (
            <motion.div
              key="empty-cart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-8"
            >
              <div>
                <img
                  src="../../assets/images/illustration-empty-cart.svg"
                  alt="Empty"
                />
              </div>
              <p className="text-rose-500 font-medium mt-4 text-center">
                Your added items will appear here
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="cart-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="divide-y divide-rose-100">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.name}
                      layout
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        scale: 0.95,
                        transition: { duration: 0.2 },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                        mass: 1,
                      }}
                      className="flex justify-between items-center border-b border-rose-100 py-3 origin-top"
                    >
                      <div className="space-y-1">
                        <p className="font-bold text-rose-900">{item.name}</p>
                        <div className="flex gap-2 items-center">
                          <span className="font-bold text-brand-red mr-2">
                            {item.quantity}x
                          </span>
                          <span className="text-rose-400">
                            @ ${item.price.toFixed(2)}
                          </span>
                          <span className="font-semibold text-rose-500">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.name)}
                        className="group p-1 border border-rose-300 rounded-full hover:border-rose-900 transition-colors cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          className="fill-[#caafa7] group-hover:fill-rose-900"
                        >
                          <path d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4l3.375-3.375 1 1L6 5l3.375 3.375-1 1Z" />
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="flex justify-between items-center py-6 mt-2">
                <p className="text-rose-900">Order Total</p>
                <p className="font-extrabold text-2xl text-rose-900">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-2 justify-center items-center py-4 bg-stone-50 rounded-lg">
                  <img
                    src="/assets/images/icon-carbon-neutral.svg"
                    alt=""
                    aria-hidden="true"
                    className={"size-6"}
                  />
                  <p className="text-stone-900">
                    This is a{" "}
                    <span className="font-semibold">carbon-neutral</span>{" "}
                    delivery
                  </p>
                </div>

                <button
                  onClick={() => setShowConfirm(true)}
                  className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bold py-4 rounded-full cursor-pointer transition-colors shadow-md active:scale-[0.98]"
                >
                  Confirm Order
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {showConfirm &&
        createPortal(
          <AnimatePresence>
            <motion.div
              key="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-end lg:items-center justify-center bg-black/50 backdrop-blur-[2px]"
            >
              <motion.div
                key="modal-content"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-full max-w-lg bg-white rounded-t-2xl lg:rounded-2xl overflow-hidden"
              >
                <OrderConfirm
                  items={items}
                  totalPrice={totalPrice}
                  onClose={handleOrderReset}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
