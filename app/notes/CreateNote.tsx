"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  async function create() {
    await fetch(`http://127.0.0.1:8090/api/collections/posts/records/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    setTitle("");
    setContent("");

    router.refresh();
  }
  return (
    <div>
      <h3>Create New Note:</h3>
      <form onSubmit={create}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Create note</button>
      </form>
    </div>
  );
};

export default CreateNote;
