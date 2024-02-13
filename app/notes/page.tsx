import Link from "next/link";
import styles from "./Notes.module.css";
import CreateNote from "./CreateNote";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://mile-liquid.pockethost.io");
pb.autoCancellation(false)

async function getNotes() {

  const data = await pb.collection("posts").getFullList({
    sort: "-created",
    cache: "no-store",
  });

  return data;
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
