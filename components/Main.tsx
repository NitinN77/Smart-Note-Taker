// @ts-nocheck

import AppContext from "../util/AppContext";
import { useContext, useEffect, useState, useMemo, useRef } from "react";
import { Button } from "@mui/material";
import dynamic from "next/dynamic";
import axios from "axios";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useSession } from "next-auth/react";

const importJodit = () => import("jodit-react");

const JoditEditor = dynamic(importJodit, {
  ssr: false,
});

const Main: React.FC = () => {
  const appContext = useContext(AppContext);
  const { data: session } = useSession();

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
  const [summarizePerc, setSummarizePerc] = useState<number>(50);

  useEffect(() => {
    console.log(summarizePerc);
  }, [summarizePerc])

  const summarizeText = () => {
    var body = new FormData();
    body.append("text", highlightedText);
    body.append("per", summarizePerc / 100);
    axios({
      method: "post",
      url: "https://sntsummarizer.herokuapp.com/summarize",
      data: body,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        onEditField(
          "body",
          appContext!.getActiveNote()?.body! + "\n\n" + response.data.text
        );
      })
      .catch(function (response) {
        alert(response);
      });
    };

    const scanImage = () => {
      // onEditField(
      //   "body",
      //   appContext!.getActiveNote()?.body! + "\n\n" + response.data.text
      // );
    }

  const handlePercChange = (e) => {
    setSummarizePerc(e.target.value)
  }

  const editor = useRef(null);
  const config = {
    readonly: false,
    height: 400,
  };

  if (!appContext!.getActiveNote()) {
    return <div className="no-active-note main-parent">No note selected</div>;
  } else
    return (
      <div className="app-main main-parent">
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
                border: "black solid 1px",
                color: "black",
                padding: "0rem 2rem",
              }}
              variant="outlined"
              onClick={() => {
                scanImage();
              }}
            >
              Scan
            </Button>
            <Button
              style={{
                marginBottom: "20px",
                marginLeft: "16px",
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
                marginLeft: "16px",
                border: "#7F6BFF solid 1px",
                color: "#7F6BFF",
                padding: "0rem 2rem",
              }}
              variant="outlined"
              onClick={() => {
                appContext!.updateUser(session.user.email);
              }}
            >
              Save
            </Button>
          </div>
          <div className="perc-slider-wrapper">
            <Slider
              key={`sliderkey-${summarizePerc}`}
              className="perc-slider"
              defaultValue={summarizePerc}
              aria-label="Default"
              valueLabelDisplay="auto"
              onChange={handlePercChange}
            />
          </div>
          <JoditEditor
            ref={editor}
            value={appContext!.getActiveNote()?.body!}
            config={config}
            onBlur={(e) => {
              onEditField("body", e);
              setHighlightedText(window.getSelection().toString());
            }}
          />
          
        </div>
      </div>
    );
};

export default Main;
