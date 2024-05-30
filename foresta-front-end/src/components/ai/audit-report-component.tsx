"use client";
import { AuditReport } from "@/components/ai/audit-report";
import { useState } from "react";

export const ReportComponent = ({ report }: { report?: AuditReport }) => {
  const [showReport, setShowReport] = useState(false);

  return (
    <div className="bg-neutral-100 p-4 rounded-md m-4 max-w-prose">
      {showReport ? (
        <>
          <h2 className="text-xl font-semibold mb-2">{report?.projectName}</h2>
          <h3 className="text-lg font-medium mb-1">Findings:</h3>
          <p>{report?.findings}</p>
          <h3 className="text-lg font-medium mt-4 mb-1">Recommendations:</h3>
          <p>{report?.recommendations}</p>
        </>
      ) : (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setShowReport(true)}
        >
          Show Report
        </button>
      )}
    </div>
  );
};
