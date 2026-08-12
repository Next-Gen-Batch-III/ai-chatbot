import ShimmerBox from "../ui/ShimmerBox.jsx";


export default function ProjectSkeleton() {
    return (
        <div className="flex flex-wrap gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                <div key={index} className="flex h-22.5 w-22.5 shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl px-2 text-center transition-colors bg-gray-100">
                    <ShimmerBox className="h-9 w-9 rounded-full" />
                    <ShimmerBox className="h-3 w-16 rounded" />
                </div>
            ))}
        </div>
    )
}