import data from "@/data.json";
import type { OrderConfirmProps, ConfirmItem, Product } from "@/types";

export default function OrderConfirm({
  items,
  totalPrice,
  onClose,
}: OrderConfirmProps) {
  const fullItems: ConfirmItem[] = items.map((cartItem) => {
    const productMatch = (data as Product[]).find(
      (p) => p.name === cartItem.name,
    );

    return {
      ...cartItem,
      image: productMatch?.image.thumbnail,
    };
  });

  return (
    <section className="bg-white w-full max-w-xl max-h-[90vh] rounded-t-2xl lg:rounded-2xl p-6 overflow-y-auto scrollbar-none">
      <header className="flex flex-col py-4 gap-3">
        <div className="size-12">
          <img
            src="../../assets/images/icon-order-confirmed.svg"
            alt="Order Confirmed"
          />
        </div>
        <h1 className={"text-4xl font-bold"}>
          Order <br></br>
          Confirmed
        </h1>
        <p className="text-rose-500">We hope you enjoy your food!</p>
      </header>
      <div className="flex-1 overflow-y-auto bg-rose-100 p-6 rounded-lg gap-4">
        {fullItems.map((item) => (
          <div
            className="flex items-center justify-between pb-4 border-b border-rose-200"
            key={item.name}
          >
            <div className="flex gap-4">
              <div className="size-12 rounded-lg overflow-hidden">
                <img src={item.image} alt="Confirmed Item's thumbnail" />
              </div>
              <div className={"flex flex-col gap-1"}>
                <div>
                  <h4
                    title={item.name}
                    className="font-semibold truncate max-w-[170px]"
                  >
                    {item.name}
                  </h4>
                </div>
                <div className={"flex gap-4"}>
                  <p className={"text-brand-red font-semibold"}>
                    x{item.quantity}
                  </p>
                  <p>@ ${item.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <div>${item.price * item.quantity}</div>
          </div>
        ))}
        <div className="flex pt-3 justify-between items-center">
          <p>Order Total</p>
          <p className={"text-2xl font-bold"}>${totalPrice.toFixed(2)}</p>
        </div>
      </div>
      <button
        onClick={() => onClose()}
        className="bg-brand-red rounded-4xl text-white font-semibold px-6 py-4 w-full my-4 cursor-pointer hover:bg-brand-red/90 duration-300 transition-colors shadow-sm active:scale-[0.98]"
      >
        Start New Order
      </button>
    </section>
  );
}
