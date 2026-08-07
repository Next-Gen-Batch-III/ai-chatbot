import {useState} from 'react';

export default function NewProjectForm({ onCreate, onCancel }) {
    const [name, setName] = useState('');

    const handleCreate = () => {
        const trimmed = name.trim();
        if (!trimmed) return;
        onCreate(trimmed);
        setName("");
    };

    return (
        <div className="rounded-xl border border-gray-200 p-3">
            <label className="mb-1 block text-xs font-medium text-gray-500">Project name</label>
            <input
                autoFocus
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                placeholder="DMIL Project"
                className="w-full rounded-lg bg-[rgba(0,0,0,0.08)] px-3 py-2 text-sm text-gray-800 placeholder:text-gray-500 outline-none"
            />
            <div className="mt-3 flex justify-end gap-2">
                <button
                onClick={onCancel}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
                >
                Cancel
                </button>
                <button
                onClick={handleCreate}
                className="rounded-full bg-[#3B98FF] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#2f86e6] transition-colors">
                Create
                </button>
            </div>
        </div>
  );
}
