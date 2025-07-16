import React from "react";

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="bg-gray-600/50 rounded-full relative w-full h-4 overflow-hidden">
      <div
        style={{ width: `${progress}%` }}
        className={`h-full rounded-full duration-200 ${
          progress === 100 ? "bg-green-500" : "bg-amber-600"
        }`}
      />
      <div className="absolute text-[11px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        {progress === 100 ? (
          <span className="flex items-center justify-center gap-2">
            Done
          </span>
        ) : (
          `${progress}%`
        )}
      </div>
    </div>
  );
}

export default ProgressBar;
