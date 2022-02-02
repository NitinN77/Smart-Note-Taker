import { MainNote } from "../util/interfaces";
import ReactMarkdown from "react-markdown";
import AppContext from '../util/AppContext'
import { useContext } from "react";

// activeNote, onUpdateNote

const Main: React.FC = () => {

  const appContext = useContext(AppContext);

  const onEditField = (key: "title" | "body", value: string) => {
    if (key == 'title') {
      appContext!.onUpdateNote({
            id: appContext!.getActiveNote().id,
            title: value,
            body: appContext!.getActiveNote().body,
            lastModified: Date.now()
        })
    } else {
      appContext!.onUpdateNote({
            id: appContext!.getActiveNote().id,
            title: appContext!.getActiveNote().title,
            body: value,
            lastModified: Date.now()
        })
    }
  }  
  if(!appContext!.getActiveNote()) return <div className="no-active-note">No note selected</div>
 

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          value={appContext!.getActiveNote()?.title}
          autoFocus
          onChange={(e) => onEditField("title", e.target.value)}
        />
        <textarea
          id="body"
          placeholder="Write your notes here..."
          value={appContext!.getActiveNote()?.body}
          onChange={(e) => onEditField("body", e.target.value)}
        />
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{appContext!.getActiveNote()?.title}</h1>
        <ReactMarkdown className="markdown-preview">{appContext!.getActiveNote()?.body}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Main;
