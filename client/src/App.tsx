import { useEffect, useState } from "react";
import DessertsCard from "@/components/DessertsCard";
import Cart from "@/components/Cart";
import { getDesserts } from "@/api/desserts.api.ts";
import { CartProvider } from "@/context/CartContext";
import type { Product } from "@/types";
import { Spinner } from "@/components/ui/spinner";

export default function App() {
  const [dessertData, setDessertData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchDesserts = async () => {
      try {
        const data = await getDesserts();
        setDessertData(data);
      } catch (err) {
        console.error("Failed to fetch desserts", err);
        setDessertData([]);
      }
    };

    fetchDesserts();
  }, []);

  if (dessertData.length === 0) {
    return (
      <div className={"flex justify-center items-center min-h-screen"}>
        <Spinner className={"size-8"} />
      </div>
    );
  }

  return (
    <CartProvider>
      <main className="grid grid-cols-1 lg:grid-cols-[70%_30%]">
        <section className={"px-6 py-7 lg:px-12 lg:py-14 grid grid-cols-1"}>
          <header>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-left">
              Desserts
            </h1>
          </header>
          <div className={"flex flex-col gap-3 justify-center items-center"}>
            <section className="flex flex-col w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 pt-5">
                {dessertData.map((dessert) => (
                  <DessertsCard
                    key={dessert.name}
                    image={dessert.image}
                    name={dessert.name}
                    category={dessert.category}
                    price={dessert.price}
                  />
                ))}
              </div>
            </section>
          </div>
        </section>
        <aside className="h-fit">
          <Cart products={dessertData} />
        </aside>
      </main>
    </CartProvider>
  );
}
