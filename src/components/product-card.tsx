import type { Product } from "../data/products";
import Quantity from "./quantity";

interface Props {
  product: Product;
  quantities: Record<string, number>;
  activeVariant: string;
  onVariant: (key: string) => void;
  onChange: (key: string, delta: number) => void;
}

export default function ProductCard({
  product,
  quantities,
  activeVariant,
  onVariant,
  onChange,
}: Props) {
  const total = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  const variant = product.variants?.find(
    (option) => option.id === activeVariant,
  );
  const key = variant?.id ?? "default";
  const quantity = quantities[key] ?? 0;
  const isPlan = product.category === "plan";
  const togglePlan = () => onChange(key, quantity > 0 ? -quantity : 1);
  return (
    <article
      className={`relative flex min-h-40 items-center gap-4 rounded-lg border bg-white p-2.5 ${total > 0 ? "border-2 border-primary" : "border-0"} ${isPlan ? "cursor-pointer" : ""} max-[760px]:min-h-0 max-[420px]:items-start max-[420px]:gap-2 max-[420px]:p-2.5`}
      onClick={isPlan ? togglePlan : undefined}
      onKeyDown={
        isPlan
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                togglePlan();
              }
            }
          : undefined
      }
      role={isPlan ? "button" : undefined}
      tabIndex={isPlan ? 0 : undefined}
      aria-pressed={isPlan ? quantity > 0 : undefined}
    >
      {product.badge && (
        <span className="absolute top-2.5 left-2.5 rounded-full bg-[#5432c5] px-2.5 py-1 text-xs font-semibold text-white">
          {product.badge}
        </span>
      )}
      <img
        className="w-28 max-h-36 shrink-0 self-center object-contain max-[760px]:w-23.5 max-[420px]:mt-5 max-[420px]:w-18.5"
        src={variant?.image ?? product.image}
        alt=""
      />
      <div className="min-w-0 flex-1">
        <h3 className="mb-2 text-sm font-semibold max-[420px]:text-[15px]">
          {product.title}
        </h3>
        {product.description && (
          <p className="text-sm text-[#666274]">
            {product.description}{" "}
            <a
              className="whitespace-nowrap text-xs text-[#0000EE] underline"
              href="#details"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              Learn More
            </a>
          </p>
        )}

        {/* Color options */}
        {product.variants && (
          <div
            className="mt-2.5 flex flex-wrap gap-1.5 max-[420px]:my-2"
            aria-label={`${product.title} colors`}
          >
            {product.variants.map((option) => (
              <button
                key={option.id}
                className={`inline-flex items-center rounded border px-1 py-0.5 text-xs hover:bg-[#f8f8fa] transition-all ${activeVariant === option.id ? "border-[#267d7d] bg-[#effafa]" : "border-[#dedde3] bg-white text-[#4d4858]"}`}
                onClick={() => onVariant(option.id)}
              >
                <img
                  className="h-7 w-7 object-contain"
                  src={option.image}
                  alt=""
                />
                {option.label}
              </button>
            ))}
          </div>
        )}
        <div className="flex items-end justify-between gap-2 max-[420px]:items-center mt-2.5">
          {!isPlan && (
            <Quantity
              quantity={quantity}
              disabled={product.locked}
              onChange={(delta) => onChange(key, delta)}
            />
          )}
          <div className="grid text-right text-lg">
            {product.compareAt && (
              <del className="text-[#D8392B]">
                ${product.compareAt.toFixed(2)}
                {product.category === "plan" && "/mo"}
              </del>
            )}
            <span className="text-lg text-[#312d3b] max-[420px]:text-[13px]">
              ${product.price.toFixed(2)}
              {product.category === "plan" && "/mo"}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
