import ShimmerBox from "../ui/ShimmerBox.jsx";

const MessageSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <ShimmerBox className="h-10 w-2/5 rounded-2xl" />
      </div>

      <div className="flex justify-start">
        <div className="w-3/4 space-y-3">
          <ShimmerBox className="h-20 w-full rounded" />
        </div>
      </div>

      <div className="flex justify-end">
        <ShimmerBox className="h-10 w-1/3 rounded-2xl" />
      </div>

      <div className="flex justify-start">
        <div className="w-2/3 space-y-3">
          <ShimmerBox className="h-15 w-full rounded" />
        </div>
      </div>
    </div>
  );
}

export default MessageSkeleton;