import ShimmerBox from "../ui/ShimmerBox.jsx";

function HistoryChatSkeleton() {
return (
    <div className="space-y-6">
      {[1, 2].map((groupIndex) => (
        <div key={groupIndex}>
            
          <div className="mb-2 flex justify-center">
            <ShimmerBox className="h-3 w-16 rounded" />
          </div>

          <div className="space-y-1">
            {[1, 2, 3].map((itemIndex) => (
              <div
                key={itemIndex}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-2"
              >
                <ShimmerBox className="h-4 w-4 shrink-0 rounded" />
                <ShimmerBox
                  className={`h-3.5 rounded ${
                    (itemIndex + groupIndex) % 2 === 0 ? "w-3/4" : "w-1/2"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default HistoryChatSkeleton;