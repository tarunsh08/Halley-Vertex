import React, { useState } from "react";

export default function TaskForm({ onSubmit }) {
  const [description, setDescription] = useState("");
  const [type, setType] = useState("frontend");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(description, type);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <textarea
        rows={4}
        cols={50}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe your task..."
        required
      />
      <br />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
      </select>
      <br />
      <button type="submit">Submit Task</button>
    </form>
  );
}
