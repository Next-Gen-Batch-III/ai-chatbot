import { useState } from "react";
import { Search, Plus, Trash2 } from "lucide-react";

const AVATAR_COLORS = [
  "bg-amber-100 text-amber-600",
  "bg-indigo-100 text-indigo-600",
  "bg-emerald-100 text-emerald-600",
  "bg-pink-100 text-pink-600",
  "bg-sky-100 text-sky-600",
];

function avatarColor(email) {
  const sum = [...email].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

export default function AddedEmailsPanel({
  emails = [],
  onAddEmail,
  onDeleteEmail,
  onSearch,
  onPrevPage,
  onNextPage,
}) {
  const [query, setQuery] = useState("");

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 p-4">
        <div className="relative w-full max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={handleSearchChange}
            placeholder="Search Users..."
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-8 pr-3 text-xs text-gray-700
                       placeholder:text-gray-400 outline-none focus:border-[#3B98FF]"
          />
        </div>

        <button
          onClick={onAddEmail}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#3B98FF] px-3 py-2 text-xs
                     font-medium text-white hover:bg-[#2f86e6] transition-colors"
        >
          <Plus size={13} />
          Add Email
        </button>
      </div>

      <div className="overflow-x-auto border-t border-gray-100">
        <table className="w-full min-w-130 text-left text-xs">
          <thead>
            <tr className="text-gray-400">
              <th className="px-4 py-2.5 font-semibold text-gray-700">Added Email</th>
              <th className="px-4 py-2.5 font-medium">Added by</th>
              <th className="px-4 py-2.5 font-medium">Added date</th>
              <th className="px-4 py-2.5 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {emails.map((entry) => (
              <tr key={entry.id} className="text-gray-700">
                <td className="px-4 py-3">
                  <span className="flex items-center gap-2">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px]
                                   font-semibold ${avatarColor(entry.email)}`}
                    >
                      {entry.email[0]?.toUpperCase()}
                    </span>
                    {entry.email}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-1 text-[11px] text-gray-600">
                    {entry.addedBy}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{entry.addedDate}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => onDeleteEmail?.(entry.id)}
                    className="rounded-md p-1 text-red-400 hover:bg-red-50 hover:text-red-500"
                    aria-label="Remove email"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {emails.length === 0 && (
          <p className="py-8 text-center text-xs text-gray-400">No emails added yet.</p>
        )}
      </div>

      <div className="flex justify-end gap-2 border-t border-gray-100 p-3">
        <button
          onClick={onPrevPage}
          className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600
                     hover:bg-gray-50 transition-colors"
        >
          Prev
        </button>
        <button
          onClick={onNextPage}
          className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600
                     hover:bg-gray-50 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}