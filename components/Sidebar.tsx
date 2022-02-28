import { Note } from "../util/interfaces";
import { useContext, useEffect, useState } from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import AppContext from '../util/AppContext'

const Sidebar = ({ SSRNotes }) => {
  const appContext = useContext(AppContext);
  const [toggle, setToggle] = useState<boolean>(false);

  const sortedNotes: Note[] = appContext!.state.notes

  const openSlideMenu = (): void => {
    document.getElementById("sidenav")!.style.width = "80%";
  };

  const closeSlideMenu = (): void => {
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

  useEffect(() => {
    appContext!.setNotes(SSRNotes);
  }, []);
  
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
              key={note.id}
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
                    appContext!.onDeleteNote(note);
                  }}
                  style={{paddingTop: '4px'}}
                >
                  <DeleteIcon color="disabled" />
                </button>
              </div>
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
              key={note.id}
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
                    appContext!.onDeleteNote(note);
                  }}
                  style={{paddingTop: '4px'}}
                >
                  <DeleteIcon color="disabled" />
                </button>
              </div>
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
