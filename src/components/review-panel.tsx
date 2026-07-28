import type { Cart } from "../App";
import { products, type Category } from "../data/products";
import Quantity from "./quantity";

const headings: Array<[Category, string]> = [
  ["cameras", "Cameras"],
  ["sensors", "Sensors"],
  ["accessories", "Accessories"],
  ["plan", "Plan"],
];
interface Props {
  cart: Cart;
  total: number;
  compareAt: number;
  onChange: (productId: string, optionId: string, delta: number) => void;
  onSave: () => void;
  onCheckout: () => void;
}

export default function ReviewPanel({
  cart,
  total,
  compareAt,
  onChange,
  onSave,
  onCheckout,
}: Props) {
  const savings = Math.max(0, compareAt - total);

  return (
    <aside className="mt-3 sticky top-6 rounded-lg bg-[#f0f5ff] p-5 max-[760px]:static max-[760px]:w-full">
      <span className="block text-[11px] font-bold uppercase tracking-[.15em] text-[#6b6877]">
        Review
      </span>
      <h1 className="mt-5 mb-1 text-[22px] font-bold">Your security system</h1>
      <p className="m-0 text-sm text-[#6b6877]">
        Review your personalized protection system designed to keep what matters
        most safe.
      </p>
      <div className="mt-6 border-t border-[#cfd5e1]">
        {headings.map(([category, heading]) => {
          const lines = products.flatMap((product) =>
            product.category !== category
              ? []
              : Object.entries(cart[product.id] ?? {})
                  .filter(([, qty]) => qty > 0)
                  .map(([option, qty]) => ({ product, option, qty })),
          );
          return lines.length ? (
            <section
              className="border-b border-[#d5dbe5] pt-3.5 pb-1"
              key={category}
            >
              <h2 className="mb-2.5 text-xs uppercase tracking-widest text-[#A8B2BD]">
                {heading}
              </h2>
              {lines.map(({ product, option, qty }) => {
                const variant = product.variants?.find(
                  (item) => item.id === option,
                );
                return (
                  <div
                    className="my-2.5 grid grid-cols-[40px_minmax(0,1fr)_104px_48px] items-center gap-2.5"
                    key={`${product.id}-${option}`}
                  >
                    <img
                      className="h-10 w-10 rounded-sm bg-white p-1 object-contain"
                      src={variant?.image ?? product.image}
                      alt=""
                    />
                    <p className="min-w-0 text-sm">
                      {product.title}
                      {variant && ` (${variant.label})`}
                    </p>
                    <div className="flex justify-center">
                      {product.category !== "plan" ? (
                        <Quantity
                          quantity={qty}
                          disabled={product.locked}
                          onChange={(delta) =>
                            onChange(product.id, option, delta)
                          }
                        />
                      ) : null}
                    </div>
                    <div className="grid text-right text-xs">
                      {product.compareAt && (
                        <del className="text-[#6F7882]">
                          ${(product.compareAt * qty).toFixed(2)}
                        </del>
                      )}
                      <strong className="text-primary font-semibold">
                        ${(product.price * qty).toFixed(2)}
                      </strong>
                    </div>
                  </div>
                );
              })}
            </section>
          ) : null;
        })}
      </div>

      {/* Shipping */}
      <div className="mt-4">
        <div className="flex flex-row justify-between">
          <div className="flex gap-3 items-center">
            <img
              src="./carbon_delivery.png"
              alt=""
              className="bg-white rounded-md p-2"
            />
            <span>Fast Shipping</span>
          </div>

          <div className="grid">
            <del className="text-[#6F7882]">$5.99</del>
            <strong className="text-primary uppercase font-semibold">
              free
            </strong>
          </div>
        </div>

        {/* Total */}
        {savings > 0 && (
          <div className="flex items-end justify-between font-bold mt-2.5">
            <img src="./logo.png" alt="" width={78} height={78} />
            <div>
              <p className="w-fit justify-self-end mt-1 mb-4 text-xs text-white bg-primary rounded-sm py-1 px-2">
                as low as ${(total / 12).toFixed(2)}/mo
              </p>
              <span className="flex flex-row gap-2">
                {savings > 0 && (
                  <del className="font-medium text-lg text-[#6F7882] self-end">
                    ${compareAt.toFixed(2)}
                  </del>
                )}
                <strong className="font-bold text-2xl text-primary">
                  ${total.toFixed(2)}
                </strong>
              </span>
            </div>
          </div>
        )}
        <div className="mt-3.5">
          {savings > 0 && (
            <p className="mb-1 text-center text-xs font-semibold text-[#0AA288]">
              Congrats! You’re saving ${savings.toFixed(2)} on your security
              bundle!
            </p>
          )}
          <button
            className="w-full rounded-sm border-0 bg-primary p-3 font-bold text-white hover:bg-primary/90 transition-all disabled:bg-gray-400"
            onClick={onCheckout}
            disabled={savings === 0}
          >
            Checkout
          </button>
        </div>
        <button
          className="mx-auto mt-2 block text-center cursor-pointer text-sm text-[#484848] italic underline hover:text-[#0000EE] transition-all"
          onClick={onSave}
        >
          Save my system for later
        </button>
      </div>
    </aside>
  );
}
