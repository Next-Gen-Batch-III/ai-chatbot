import { Users, User, FileText, Mail } from "lucide-react";

const ICONS = { users: Users, user: User, file: FileText, mail: Mail };

export default function StatsOverview({ stats = [] }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map(({ key, icon, label, value }) => {
        const Icon = ICONS[icon] ?? Users;
        return (
          <div key={key} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <Icon size={18} className="text-[#3B98FF]" />
              {label}
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          </div>
        );
      })}
    </div>
  );
}