// @ts-nocheck

import AppContext from "../util/AppContext";
import { useContext, useEffect, useState, useMemo, useRef } from "react";
import { Button } from "@mui/material";
import dynamic from "next/dynamic";
import axios from 'axios';

const importJodit = () => import("jodit-react");

const JoditEditor = dynamic(importJodit, {
  ssr: false,
});

const Main: React.FC = () => {
  const appContext = useContext(AppContext);

  const onEditField = (key: "title" | "body", value: string) => {
    if (key == "title") {
      appContext!.onUpdateNote({
        id: appContext!.getActiveNote()!.id,
        title: value,
        body: appContext!.getActiveNote()!.body,
        lastModified: Date.now(),
        author: appContext!.getActiveNote()!.author,
      });
    } else {
      appContext!.onUpdateNote({
        id: appContext!.getActiveNote()!.id,
        title: appContext!.getActiveNote()!.title,
        body: value,
        lastModified: Date.now(),
        author: appContext!.getActiveNote()!.author,
      });
    }
  };

  const [highlightedText, setHighlightedText] = useState<string>("");
  
  const summarizeText = () => {
    var body = new FormData();
    body.append('text', highlightedText);
    body.append('per', 0.5);
    axios({
      method: "post",
      url: "https://sntsummarizer.herokuapp.com/summarize",
      data: body,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        onEditField("body", appContext!.getActiveNote()?.body! + "\n\n" + response.data.text)
      })
      .catch(function (response) {
        console.log(response);
      });
  }

  const editor = useRef(null);
  const [content, setContent] = useState("Start writing");
  const config = {
    readonly: false,
    height: 400,
  };

  if (!appContext!.getActiveNote()) {
    return <div className="no-active-note">No note selected</div>;
  } else
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
            <Button
              style={{
                marginBottom: "20px",
                border: "darkblue solid 1px",
                color: "darkblue",
                padding: "0rem 2rem",
              }}
              variant="outlined"
              onClick={() => {
                summarizeText();
              }}
            >
              Summarize
            </Button>
            <Button
              style={{
                marginBottom: "20px",
                marginLeft: "25px",
                border: "#7F6BFF solid 1px",
                color: "#7F6BFF",
                padding: "0rem 2rem",
              }}
              variant="outlined"
              onClick={() => {
                appContext!.writeAllNotes();
              }}
            >
              Save
            </Button>
          </div>
          {/* <textarea
          id="body"
          placeholder="Write your notes here..."
          value={appContext!.getActiveNote()?.body}
          onChange={(e) => onEditField("body", e.target.value)}
        /> */}
          <JoditEditor
            ref={editor}
            value={appContext!.getActiveNote()?.body!}
            config={config}
            onBlur={(e) => {onEditField("body", e); setHighlightedText(window.getSelection().toString())}}
          />
          {/* <ReactQuill value={tempval}
          onChange={setTempval}
          style={{height: '85vh'}}
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [{ align: [] }],
              [{ color: [] }, { background: [] }],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link", "video", "image", "code-block"],
              ["clean"],
              [{script: "sub"}, {script: "super"}],
            ],
          }}
          formats={[
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "color",
            "background",
            "list",
            "bullet",
            "indent",
            "link",
            "video",
            "image",
            "code-block",
            "align",
            "script"
          ]}
          /> */}
        </div>
      </div>
    );
};

export default Main;
