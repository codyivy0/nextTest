import Link from "next/link";
import styles from "./Notes.module.css";
import CreateNote from "./CreateNote";
import PocketBase from "pocketbase";
// @ts-nocheck

const pb = new PocketBase("https://mile-liquid.pockethost.io");

async function getNotes() {
  const res = await fetch(
    "https://mile-liquid.pockethost.io/api/collections/posts/records?page=1&perPage=30",
    { cache: "no-store" }
  );
  const data = await res.json();

  return data?.items as any[];
}

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <div>
      <h1>Notes</h1>
      <div className={styles.grid}>
        {notes?.map((note) => {
          return <Note key={note.id} note={note} />;
        })}
      </div>
      <CreateNote />
    </div>
  );
}

function Note({ note }: any) {
  const { id, title, content, created } = note || {};

  return (
    <Link href={`/notes/${id}`}>
      <div className={styles.note}>
        <h2>{title}</h2>
        <h5>{content}</h5>
        <p>{created}</p>
      </div>
    </Link>
  );
}
