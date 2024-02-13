"use client";
import PocketBase from "pocketbase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const pb = new PocketBase("https://mile-liquid.pockethost.io");

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = { title, content };

    console.log(data);
    await pb.collection("posts").create(data);
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
