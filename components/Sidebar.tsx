import { SideNotes, Note } from "../util/interfaces";
import ReactMarkdown from "react-markdown";
import { useContext, useEffect, useState } from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import AppContext from '../util/AppContext'

const Sidebar: React.FC = () => {
  const appContext = useContext(AppContext);

  const [toggle, setToggle] = useState<boolean>(false);

  const sortedNotes: Note[] = appContext!.state.notes.sort(
    (a: Note, b: Note) => b.lastModified - a.lastModified
  );

  const openSlideMenu = () => {
    document.getElementById("sidenav")!.style.width = "80%";
  };

  const closeSlideMenu = () => {
    document.getElementById("sidenav")!.style.width = "0%";
  };

  const toggleMenu = () => {
    if (!toggle) {
      openSlideMenu();
    } else {
      closeSlideMenu();
    }
    setToggle(!toggle);
  };

  return (
    <>
      <div className="float-button" id="float-button">
        <a
          href="#"
          className="float"
          onClick={() => {
            toggleMenu();
          }}
        >
          
          <i className="fa fa-plus my-float"></i>
        </a>
      </div>

      <div className="app-sidebar" id="sidebar">
        
        <div className="app-sidebar-header">
          <h1>Notes</h1>
          <button
            
            onClick={() => {
              appContext!.onAddNote();
            }}
          >
            <AddBoxIcon color="disabled"/>
            
          </button>
        </div>
        <div className="app-sidebar-notes">
          {sortedNotes.map((note) => (
            <div
              className={`app-sidebar-note ${
                note.id === appContext!.state.activeNote && "active"
              }`}
              onClick={() => {
                appContext!.setActiveNote(note.id);
              }}
            >
              <div className="sidebar-note-title">
                <h4>{note.title}</h4>
                <button
                  onClick={() => {
                    appContext!.onDeleteNote(note.id);
                  }}
                  style={{paddingTop: '4px'}}
                >
                  <DeleteIcon color="disabled" />
                </button>
              </div>
              {note.body && (
                <ReactMarkdown>
                  {note.body.split("\n")[0].substring(0, 100) + "..."}
                </ReactMarkdown>
              )}
              <small className="note-meta">
                Last Modified{" "}
                {new Date(note.lastModified).toLocaleDateString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </div>
          ))}
          <div className="sidebar-user">
            User Area
          </div>
        </div>
      </div>
      
      {/* {mobile view} */}

      <div className="app-sidenav" id="sidenav">
        
        <div className="app-sidebar-header">
          <h1>Notes</h1>
          <button
            
            onClick={() => {
              appContext!.onAddNote();
            }}
          >
            <AddBoxIcon color="disabled"/>
            
          </button>
        </div>
        <div className="app-sidebar-notes">
          {sortedNotes.map((note) => (
            <div
              className={`app-sidebar-note ${
                note.id === appContext!.state.activeNote && "active"
              }`}
              onClick={() => {
                appContext!.setActiveNote(note.id);
              }}
            >
              <div className="sidebar-note-title">
                <p>{note.title}</p>
                <button
                  onClick={() => {
                    appContext!.onDeleteNote(note.id);
                  }}
                  style={{paddingTop: '4px'}}
                >
                  <DeleteIcon color="disabled" />
                </button>
              </div>
              {note.body && (
                <ReactMarkdown>
                  {note.body.split("\n")[0].substring(0, 100) + "..."}
                </ReactMarkdown>
              )}
              <small className="note-meta">
                Last Modified{" "}
                {new Date(note.lastModified).toLocaleDateString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </div>
          ))}
          <div className="sidebar-user">
            User Area
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
