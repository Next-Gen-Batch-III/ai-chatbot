import { useEffect, useState } from "react";
import DashboardHeader from "../components/admin/DashboardHeader";
import StatsOverview from "../components/admin/StatsOverview";
import KnowledgeBase from "../components/admin/KnowledgeBase";
import AiInstructions from "../components/admin/AiInstructions";
import AddedEmailsPanel from "../components/admin/AddedEmailsPanel";

const STAT_DEFS = [
  { key: "total-user", icon: "users", label: "Total User" },
  { key: "active-user", icon: "user", label: "Active User" },
  { key: "file-upload", icon: "file", label: "File Upload" },
  { key: "ai-requested", icon: "mail", label: "AI Requested Today" },
];

export default function AdminDashboard() {
  const [statValues, setStatValues] = useState({});
  const [loadingStats, setLoadingStats] = useState(true);

  const [emails, setEmails] = useState([]);
  const [loadingEmails, setLoadingEmails] = useState(true);

  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    let cancelled = false;

    setLoadingStats(false);

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    setLoadingEmails(false);

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    return () => {
      cancelled = true;
    };
  }, []);

  const stats = STAT_DEFS.map((def) => ({
    ...def,
    value: statValues[def.key] ?? 0,
  }));

  const handleDeleteEmail = (emailId) => {
    setEmails((prev) => prev.filter((e) => e.id !== emailId));
  };

  const handleAddEmail = () => {
  };

  const handleSaveInstructions = (html) => {
    setInstructions(html);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-5">
        <DashboardHeader
          title="Dashboard"
          onThemeChange={(theme) => {
            console.log("Theme:", theme);
          }}
        />

        <StatsOverview stats={stats} loading={loadingStats} />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <KnowledgeBase />
          </div>
          <div className="lg:col-span-1">
            <AiInstructions initialContent={instructions} onSave={handleSaveInstructions} />
          </div>
        </div>

        <AddedEmailsPanel
          emails={emails}
          loading={loadingEmails}
          onAddEmail={handleAddEmail}
          onDeleteEmail={handleDeleteEmail}
          onSearch={(query) => {
          }}
          onPrevPage={() => {
          }}
          onNextPage={() => {
          }}
        />
      </div>
    </div>
  );
}