"use client";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";

const pb = new PocketBase("https://mile-liquid.pockethost.io");

const DeleteNote = ({ id }: any) => {
  const router = useRouter();
  async function deleteNote(noteId: string) {
    await pb.collection("posts").delete(noteId);

    router.push("/notes");
    router.refresh();
  }
  return <button onClick={() => deleteNote(id)}>Delete Note</button>;
};

export default DeleteNote;
