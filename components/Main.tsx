import { Note } from "../util/interfaces";
import ReactMarkdown from "react-markdown";
import AppContext from "../util/AppContext";
import { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Main: React.FC = () => {
  const appContext = useContext(AppContext);

  const onEditField = (key: "title" | "body", value: string) => {
    if (key == "title") {
      appContext!.onUpdateNote({
        id: appContext!.getActiveNote()!.id,
        title: value,
        body: appContext!.getActiveNote()!.body,
        lastModified: Date.now(),
      });
    } else {
      appContext!.onUpdateNote({
        id: appContext!.getActiveNote()!.id,
        title: appContext!.getActiveNote()!.title,
        body: value,
        lastModified: Date.now(),
      });
    }
  };

  if (!appContext!.getActiveNote())
    return <div className="no-active-note">No note selected</div>;

  const [mdValue, setMdValue] = useState<string | undefined>(appContext!.getActiveNote()?.body)
  const [tempval, setTempval] = useState<string | undefined>(appContext!.getActiveNote()?.body)
  
  useEffect(() => {
    setMdValue(appContext!.getActiveNote()?.body)
    setTempval(appContext!.getActiveNote()?.body)
  }, [appContext!.getActiveNote()?.id])

  useEffect(() => {
    if(tempval != mdValue) {
      onEditField("body", mdValue!)
      setMdValue(tempval)
    }
  }, [tempval])
  

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <div className="app-main-note-top"> 
          <input
            type="text"
            id="title"
            value={appContext!.getActiveNote()?.title}
            autoFocus
            onChange={(e) => onEditField("title", e.target.value)}
          />
          <Button className="save-button" variant="outlined" onClick={() => {appContext!.writeAllNotes()}}>Save</Button>
        </div>
        {/* <textarea
          id="body"
          placeholder="Write your notes here..."
          value={appContext!.getActiveNote()?.body}
          onChange={(e) => onEditField("body", e.target.value)}
        /> */}
        <ReactQuill value={tempval}
          onChange={setTempval}/>
      </div>
    </div>
  );
};

export default Main;

