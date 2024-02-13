import DeleteNote from "../DeleteNote";
import styles from "../Notes.module.css";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://mile-liquid.pockethost.io");
pb.autoCancellation(false);

async function getNote(noteId: string) {
  const record = await pb.collection("posts").getOne(noteId);
  return record;
}


export default async function NotePage({ params }: any) {
  const note = await getNote(params.id);
  return (
    <div>
      <h1>notes/{note.id}</h1>
      <div className={styles.note}>
        <h3>{note.title}</h3>
        <h5>{note.content}</h5>
        <p>{note.created}</p>
      </div>
      <DeleteNote id={note.id}/>
    </div>
  );
}
