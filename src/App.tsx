import { useMemo, useState } from "react";
import { Triangle } from "lucide-react";
import { products, stepMeta, type Category } from "./data/products";
import ProductCard from "./components/product-card";
import ReviewPanel from "./components/review-panel";

export type Cart = Record<string, Record<string, number>>;
const STORAGE_KEY = "wyze-system-builder";

const defaultCart = (): Cart =>
  Object.fromEntries(
    products.map((product) => [product.id, { ...product.initialQuantities }]),
  );
const savedSystem = (): {
  cart?: Cart;
  activeVariants?: Record<string, string>;
} => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") ?? {};
  } catch {
    return {};
  }
};

function App() {
  const restored = useMemo(() => savedSystem(), []);
  const [openStep, setOpenStep] = useState(1);
  const [activeVariants, setActiveVariants] = useState<Record<string, string>>(
    () =>
      restored.activeVariants ??
      Object.fromEntries(
        products
          .filter((product) => product.variants)
          .map((product) => [product.id, product.variants![0].id]),
      ),
  );
  const [cart, setCart] = useState<Cart>(() => restored.cart ?? defaultCart());
  const [notice, setNotice] = useState("");

  const updateQuantity = (productId: string, optionId: string, delta: number) =>
    setCart((current) => ({
      ...current,
      [productId]: {
        ...current[productId],
        [optionId]: Math.max(0, (current[productId]?.[optionId] ?? 0) + delta),
      },
    }));
  const selectedCount = (category: Category) =>
    products.filter(
      (product) =>
        product.category === category &&
        Object.values(cart[product.id] ?? {}).some((qty) => qty > 0),
    ).length;
  const totals = useMemo(
    () =>
      products.reduce(
        (result, product) => {
          const quantity = Object.values(cart[product.id] ?? {}).reduce(
            (sum, qty) => sum + qty,
            0,
          );
          result.price += quantity * product.price;
          result.compareAt += quantity * (product.compareAt ?? product.price);
          return result;
        },
        { price: 0, compareAt: 0 },
      ),
    [cart],
  );
  const saveSystem = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, activeVariants }));
    setNotice("Your system has been saved.");
  };
  const checkout = () =>
    setNotice(
      "Thanks for your order! We'll get back to you as soon as we can.",
    );

  return (
    <main className="mx-auto grid max-w-360 grid-cols-[minmax(0,1fr)_410px] items-start gap-9 px-16 py-12 max-[1100px]:grid-cols-[minmax(0,1fr)_350px] max-[1100px]:gap-5 max-[1100px]:px-7 max-[760px]:flex max-[760px]:flex-col max-[760px]:gap-5 max-[400px]:p-0 max-[400px]:items-stretch max-[400px]:gap-0">
      <section className="min-w-0" aria-label="Security system builder">
        {stepMeta.map((step, index) => {
          const number = index + 1,
            open = openStep === number,
            stepProducts = products.filter(
              (product) => product.category === step.category,
            );
          return (
            <section
              className={`border-b border-[#dddbe1] max-[400px]:mt-0 ${open ? "my-3 overflow-hidden rounded-lg max-[400px]:rounded-none border-0 bg-[#f0f5ff]" : ""}`}
              key={step.category}
            >
              <button
                className="w-full border-0 bg-transparent p-3.5 text-left text-inherit max-[760px]:p-4.25"
                onClick={() => setOpenStep(open ? 0 : number)}
                aria-expanded={open}
              >
                <span className="block text-xs font-medium uppercase tracking-widest text-[#484848]">
                  Step {number} of 4
                </span>
                <span className="my-3 -mx-6 block h-px bg-[#dcdbe1] max-[760px]:-mx-4.25" />
                <span className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-3 text-2xl font-semibold">
                    <img
                      className="h-7 w-7 object-contain"
                      src={step.icon}
                      alt=""
                    />
                    {step.title}
                  </span>
                  <span className="flex items-center gap-2 text-[#4e27a8]">
                    {open && (
                      <span className="text-sm font-medium">
                        {selectedCount(step.category)} selected
                      </span>
                    )}
                    {open ? (
                      <Triangle size={10} fill="#4E2FD2" />
                    ) : (
                      <Triangle
                        size={10}
                        fill="#4E2FD2"
                        className="rotate-180"
                      />
                    )}
                  </span>
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 max-[760px]:px-3.25">
                  <div className="grid grid-cols-2 gap-3.5 max-[1100px]:grid-cols-1">
                    {stepProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        quantities={cart[product.id] ?? {}}
                        activeVariant={activeVariants[product.id] ?? "default"}
                        onVariant={(id) =>
                          setActiveVariants((current) => ({
                            ...current,
                            [product.id]: id,
                          }))
                        }
                        onChange={(id, delta) =>
                          updateQuantity(product.id, id, delta)
                        }
                      />
                    ))}
                  </div>

                  {number < 4 && (
                    <button
                      className="mx-auto mt-3.5 block rounded-[7px] border border-primary hover:bg-gray-300/50 transition-all px-6 py-2 text-lg font-semibold text-primary"
                      onClick={() => setOpenStep(number + 1)}
                    >
                      Next: {stepMeta[index + 1].title}
                    </button>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </section>

      {/* Cart */}
      <ReviewPanel
        cart={cart}
        total={totals.price}
        compareAt={totals.compareAt}
        onChange={updateQuantity}
        onSave={saveSystem}
        onCheckout={checkout}
      />
      {notice && (
        <div
          role="status"
          className="fixed right-6 bottom-6 flex items-center gap-4 rounded-lg bg-[#2f2938] px-4 py-3 text-white shadow-[0_6px_20px_#0003]"
        >
          {notice}
          <button onClick={() => setNotice("")}>×</button>
        </div>
      )}
    </main>
  );
}
export default App;
