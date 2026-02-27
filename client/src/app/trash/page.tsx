"use client";

import Link from "next/link";
import { Trash2, ArrowLeft } from "lucide-react";

export default function Trash() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold flex items-center gap-2">
              <Trash2 className="text-red-600" />
              Trash
            </h1>

            <Link
              href="/"
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-black"
            >
              <ArrowLeft size={16} />
              Back
            </Link>
          </div>

          {/* Empty State */}
          <div className="text-center py-16">
            <Trash2 size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">
              Trash is empty
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Deleted items will appear here before removal.
            </p>
          </div>

          {/* Future Actions */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              disabled
              className="px-4 py-2 text-sm rounded-md border text-gray-400 cursor-not-allowed"
            >
              Restore All
            </button>
            <button
              disabled
              className="px-4 py-2 text-sm rounded-md bg-red-600 text-white opacity-50 cursor-not-allowed"
            >
              Empty Trash
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
