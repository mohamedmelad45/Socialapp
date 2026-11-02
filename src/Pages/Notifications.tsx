import { Button } from "@heroui/react";
import { useState } from "react";
import { HiCheck } from "react-icons/hi2";

export default function Notifications() {
  const [filter, setFilter] = useState<"all" | "unread">("all");

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-xs text-gray-500 mt-1">
              Realtime updates for likes, comments, shares, and follows.
            </p>
          </div>

          <Button
            size="sm"
            className="bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 border border-gray-200 self-start sm:self-auto cursor-pointer"
          >
            <HiCheck className="text-sm" />
            Mark all as read
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition ${
              filter === "unread"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Unread
          </button>
        </div>

        <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-16 text-center text-gray-400 text-xs font-medium">
          No notifications yet.
        </div>

      </div>
    </div>
  );
}