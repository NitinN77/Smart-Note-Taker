import { SideNotes, Note } from "../util/interfaces";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';

const Sidebar: React.FC<SideNotes> = ({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
}) => {

  
  const [toggle, setToggle] = useState<boolean>(false);

  const sortedNotes: Note[] = notes.sort(
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
              onAddNote();
            }}
          >
            <AddBoxIcon color="disabled"/>
            
          </button>
        </div>
        <div className="app-sidebar-notes">
          {sortedNotes.map((note) => (
            <div
              className={`app-sidebar-note ${
                note.id === activeNote && "active"
              }`}
              onClick={() => {
                setActiveNote(note.id);
              }}
            >
              <div className="sidebar-note-title">
                <p>{note.title}</p>
                <button
                  onClick={() => {
                    onDeleteNote(note.id);
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

      <div className="app-sidenav" id="sidenav">
        <div className="app-sidebar-header">
          <h1>Notes</h1>
          <button
            onClick={() => {
              onAddNote();
            }}
          >
            Add
          </button>
        </div>
        <div className="app-sidebar-notes">
          {sortedNotes.map((note) => (
            <div
              className={`app-sidebar-note ${
                note.id === activeNote && "active"
              }`}
              onClick={() => {
                setActiveNote(note.id);
              }}
            >
              <div className="sidebar-note-title">
                <p>{note.title}</p>
                <button
                  onClick={() => {
                    onDeleteNote(note.id);
                  }}
                >
                  Delete
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

        </div>
      </div>
    </>
  );
};

export default Sidebar;
