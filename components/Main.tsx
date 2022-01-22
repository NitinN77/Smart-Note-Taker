import { MainNote } from "../util/interfaces";
import ReactMarkdown from "react-markdown";

const Main: React.FC<MainNote> = ({ activeNote, onUpdateNote }) => {

  const onEditField = (key: "title" | "body", value: string) => {
    if (key == 'title') {
        onUpdateNote({
            id: activeNote.id,
            title: value,
            body: activeNote.body,
            lastModified: Date.now()
        })
    } else {
        onUpdateNote({
            id: activeNote.id,
            title: activeNote.title,
            body: value,
            lastModified: Date.now()
        })
    }
  }  
  if(!activeNote) return <div className="no-active-note">No note selected</div>
 

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          value={activeNote?.title}
          autoFocus
          onChange={(e) => onEditField("title", e.target.value)}
        />
        <textarea
          id="body"
          placeholder="Write your notes here..."
          value={activeNote?.body}
          onChange={(e) => onEditField("body", e.target.value)}
        />
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote?.title}</h1>
        <ReactMarkdown className="markdown-preview">{activeNote?.body}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Main;
