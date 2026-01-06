import AddToCart from "@/components/AddToCart.tsx";
import { useCart } from "@/context/CartContext.tsx";
import type { Product } from "@/types";

export default function DessertsCard({
  image,
  name,
  category,
  price,
}: Product) {
  const { items, updateQuantity } = useCart();

  const cartItem = items.find((item) => item.name === name);
  const count = cartItem ? cartItem.quantity : 0;

  return (
    <article>
      <div
        className={`relative rounded-lg shadow-sm border-2 transition-all duration-400 ${
          count > 0 ? "border-brand-red" : "border-transparent"
        }`}
      >
        <picture className="overflow-hidden rounded-lg">
          {/* Desktop */}
          <source media="(min-width: 1024px)" srcSet={image.desktop} />
          {/* Tablet */}
          <source media="(min-width: 768px)" srcSet={image.tablet} />
          {/* Mobile*/}
          <img src={image.mobile} alt={name} className="h-auto rounded-lg" />
        </picture>
        <AddToCart
          count={count}
          setCount={(value) => {
            const nextCount =
              typeof value === "function" ? value(count) : value;
            const delta = nextCount - count;
            updateQuantity(name, delta, price);
          }}
        />
      </div>
      <div className="flex flex-col gap-0.5 mt-9">
        <span className={"text-rose-400 md:text-base"}>{category}</span>
        <h4 className={"font-semibold lg:text-lg"}>{name}</h4>
        <h3 className={"text-brand-red"}>$ {price}</h3>
      </div>
    </article>
  );
}
