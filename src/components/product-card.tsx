export default function ProductCard() {
  return (
    <div className="w-fit p-2.5 flex flex-row items-center gap-5 rounded-lg border-2 border-violet-500 bg-white">
      <div>
        {/* Discount badge */}
        <span className="inline-block rounded-full py-1 px-2.5 bg-indigo-600 text-xs font-semibold text-white">
          Save 22%
        </span>
        {/* Product image */}
        <img src="./Wyze_Cam_V4_01.0001.png" alt="" width={100} height={137} />
      </div>
      <div className="flex flex-col gap-2.5">
        {/* Title */}
        <h3>Wyze Cam v4</h3>
        {/* Description */}
        <p>The clearest Wyze Cam ever made. Learn More</p>
        {/* Color Variant selector */}
        <div>Selector</div>
        <div className="flex flex-row items-center justify-between gap-2.5">
          {/* Quantity stepper */}
          <div className="flex flex-row items-center gap-2.5">
            <button className="h-8 w-8 rounded-lg border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-500 hover:border-gray-400 hover:shadow transition-all text-lg leading-none">
              −
            </button>
            <span className="w-4 text-center text-sm font-semibold text-gray-800">
              1
            </span>
            <button className="h-8 w-8 rounded-lg border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-500 hover:border-gray-400 hover:shadow transition-all text-lg leading-none">
              +
            </button>
          </div>
          {/* pricing */}
          <div className="flex flex-col">
            <span className="line-through text-red-600">$39.98</span>
            <span>$29.98</span>
          </div>
        </div>
      </div>
    </div>
  );
}
