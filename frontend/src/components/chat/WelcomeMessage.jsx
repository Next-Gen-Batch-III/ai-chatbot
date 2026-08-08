export default function WelcomeMessage({ name = "there", subtitle }) {
    return (
        <div className="text-center">
            <h1 className="text-2xl font-bold !text-gray-950 dark:!text-gray-950">
                Welcome, {name}!
            </h1>
            <p className="mt-1 text-sm text-gray-500">
                {subtitle ?? "How can I help you with your project today?"}
            </p>
        </div>
    );
}
