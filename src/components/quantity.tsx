import { Minus, Plus } from "lucide-react";

export default function Quantity({
  quantity,
  onChange,
  disabled = false,
}: {
  quantity: number;
  onChange: (delta: number) => void;
  disabled?: boolean;
}) {
  const button =
    "grid h-7 w-7 place-items-center rounded-md border border-[#d5d4da] bg-[#f8f8fa] text-[#393544] disabled:cursor-not-allowed disabled:bg-white disabled:text-[#c8c6ce] hover:bg-[#eae9f0] transition-all";
  return (
    <div className="inline-flex items-center gap-2.5">
      <button
        className={button}
        aria-label="Decrease quantity"
        disabled={disabled || quantity === 0}
        onClick={() => onChange(-1)}
      >
        <Minus size={15} />
      </button>
      <span className="min-w-4 text-center text-sm font-semibold">
        {quantity}
      </span>
      <button
        className={button}
        aria-label="Increase quantity"
        disabled={disabled}
        onClick={() => onChange(1)}
      >
        <Plus size={15} />
      </button>
    </div>
  );
}
