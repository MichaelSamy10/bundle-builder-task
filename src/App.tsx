import { useState } from "react";
import "./App.css";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProductCard from "./components/product-card";

function App() {
  const [openStep, setOpenStep] = useState(1);

  const steps = [
    {
      title: "Choose your cameras",
      image: "./livestream.svg",
    },
    {
      title: "Choose your plan",
      image: "./video.svg",
    },
    {
      title: "Choose your sensors",
      image: "./smartHome.svg",
    },
    {
      title: "Add extra protection",
      image: "./shield.svg",
    },
  ];

  return (
    <div className="flex flex-row gap-7 mx-32 my-12">
      <div className="max-w-3xl mx-auto py-10 space-y-3 w-full">
        {steps.map((item, index) => {
          const step = index + 1;
          const isOpen = openStep === step;

          return (
            <div
              key={step}
              className={`rounded-xl border border-gray-300 overflow-hidden ${isOpen ? "bg-blue-50" : "bg-white"}`}
            >
              {/* Header */}
              <button
                onClick={() => setOpenStep(step)}
                className="w-full p-5 text-left"
              >
                <div>
                  <p className="text-xs text-gray-600 tracking-[1.6px]">
                    STEP {step} OF 4
                  </p>
                  <hr className="mt-2 -mx-5" />
                  <div className="flex flex-row items-center justify-between mt-5">
                    <div className="flex flex-row items-center gap-2 ">
                      <img src={item.image} alt="" />
                      <h2 className="font-semibold text-xl">{item.title}</h2>
                    </div>
                    <div className="flex items-center gap-2">
                      {isOpen && (
                        <span className="text-violet-700">0 selected</span>
                      )}

                      {isOpen ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </div>
                  </div>
                </div>
              </button>

              {/* Content */}
              {isOpen && (
                <div className="p-5">
                  <ProductCard />

                  {step < 4 && (
                    <button
                      onClick={() => setOpenStep(step + 1)}
                      className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      Next: {steps[index + 1].title}
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="bg-blue-50"></div>
    </div>
  );
}

export default App;
