import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MessageBox = ({ message, sender }) => {
  const isUser = sender === "USER_INPUT";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-[80%] rounded-3xl px-4 py-2 text-sm
          ${
            isUser
              ? "bg-[#3B98FF] text-white text-right"
              : "bg-gray-100 text-gray-800 text-left"
          }
        `}
      >
        {isUser ? (
          message
        ) : (
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Headings
              h1: ({ children }) => (
                <h1 className="mb-2 mt-3 text-base font-bold">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="mb-2 mt-3 text-sm font-bold">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="mb-1 mt-2 text-sm font-semibold">{children}</h3>
              ),

              // Paragraph — skip adding <p> margin on the very first/last child
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,

              // Inline code
              code: ({ inline, children }) =>
                inline ? (
                  <code className="rounded bg-gray-200 px-1 py-0.5 font-mono text-xs text-gray-800">
                    {children}
                  </code>
                ) : (
                  <code>{children}</code>
                ),

              // Code block
              pre: ({ children }) => (
                <pre className="my-2 overflow-x-auto rounded-xl bg-gray-800 px-4 py-3 font-mono text-xs text-gray-100">
                  {children}
                </pre>
              ),

              // Bold / italic
              strong: ({ children }) => (
                <strong className="font-semibold">{children}</strong>
              ),
              em: ({ children }) => <em className="italic">{children}</em>,

              // Unordered list
              ul: ({ children }) => (
                <ul className="mb-2 ml-4 list-disc space-y-0.5">{children}</ul>
              ),

              // Ordered list
              ol: ({ children }) => (
                <ol className="mb-2 ml-4 list-decimal space-y-0.5">
                  {children}
                </ol>
              ),

              li: ({ children }) => (
                <li className="leading-snug">{children}</li>
              ),

              // Blockquote
              blockquote: ({ children }) => (
                <blockquote className="my-2 border-l-4 border-gray-400 pl-3 italic text-gray-600">
                  {children}
                </blockquote>
              ),

              // Horizontal rule
              hr: () => <hr className="my-3 border-gray-300" />,

              // Links
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600"
                >
                  {children}
                </a>
              ),

              // Tables (remark-gfm)
              table: ({ children }) => (
                <div className="my-2 overflow-x-auto">
                  <table className="w-full border-collapse text-xs">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-gray-200">{children}</thead>
              ),
              th: ({ children }) => (
                <th className="border border-gray-300 px-2 py-1 text-left font-semibold">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-gray-300 px-2 py-1">{children}</td>
              ),
            }}
          >
            {message}
          </Markdown>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
