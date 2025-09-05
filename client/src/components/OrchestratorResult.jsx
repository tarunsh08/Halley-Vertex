import React from "react";

export default function OrchestratorResult({ subtasks }) {
  if (!subtasks || subtasks.length === 0) return null;

  return (
    <div>
      <h3>Orchestrated Task Results</h3>
      {subtasks.map((task) => (
        <div key={task._id} style={{ marginBottom: "1rem" }}>
          <h4>{task.type.toUpperCase()} Result</h4>
          <p>Status: {task.status}</p>
          {task.result && (
            <pre style={{ background: "#111", color: "#0f0", padding: "1rem" }}>
              {typeof task.result === "string"
                ? task.result
                : JSON.stringify(task.result, null, 2)}
            </pre>
          )}
        </div>
      ))}
    </div>
  );
}
