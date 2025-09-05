import React from "react";

export default function TaskResult({ taskId, status, result }) {
  if (!taskId) return null;

  return (
    <div>
      <h3>Task ID: {taskId}</h3>
      <p>Status: {status}</p>

      {result && (
        <>
          <h3>Result:</h3>
          <pre style={{ background: "#111", color: "#0f0", padding: "1rem" }}>
            {typeof result === "string"
              ? result
              : JSON.stringify(result, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
}
