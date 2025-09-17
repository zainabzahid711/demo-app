// src/components/ui/ActionModal.tsx
"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  action: "accept" | "reject";
  doctorName: string;
}

export default function ActionModal({
  isOpen,
  onClose,
  onConfirm,
  action,
  doctorName,
}: ActionModalProps) {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (action === "reject" && !reason.trim()) {
      alert("Please enter a reason for rejection");
      return;
    }
    onConfirm(action === "reject" ? reason : undefined);
    setReason("");
  };

  const handleClose = () => {
    setReason("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {action === "accept" ? "Accept Doctor" : "Rejected Doctor"}
          </h3>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-gray-600 mb-4">
            {action === "accept"
              ? `Are you sure you want to accept Dr. ${doctorName}?`
              : "Please enter the reason of rejection."}
          </p>

          {action === "reject" && (
            <div>
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Reason
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason here....."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none"
                rows={4}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-2 p-4 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-normal text-gray-600 hover:text-gray-800 transition-colors"
          >
            {action === "reject" ? "Close" : "Cancel"}
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 text-sm font-normal text-white rounded-md transition-colors ${
              action === "accept"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-cyan-500 hover:bg-cyan-600"
            }`}
          >
            {action === "accept" ? "Accept" : "Ok"}
          </button>
        </div>
      </div>
    </div>
  );
}
