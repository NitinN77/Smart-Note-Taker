import { Note } from "../util/interfaces";
import ReactMarkdown from "react-markdown";
import { useContext, useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import AppContext from "../util/AppContext";
import { Button, Input } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import rehypeRaw from "rehype-raw";
import { useSession, signIn, signOut } from "next-auth/react";

const Sidebar = () => {
  const appContext = useContext(AppContext);
  const { data: session } = useSession();
  const [toggle, setToggle] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const sortedNotes: Note[] = appContext!.state.notes.sort(
    (a: Note, b: Note) => b.lastModified - a.lastModified
  ).filter(note => note.author == session?.user?.email);

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
    if (session) {
      appContext!.setUser(session.user!.email);
      console.log(session.user!.email);
    }
  }, [session]);

  const handleSignIn = () => {
    signIn();
  };

  const dynamicSearch = () => {
    return sortedNotes.filter((note) => {
      if (searchTerm.length > 0) {
        return note.title.toLowerCase().includes(searchTerm.toLowerCase());
      } else {
        return sortedNotes
      }
    });
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
              appContext!.onAddNote(session!.user!.email!);
            }}
          >
            <AddBoxIcon color="disabled" />
          </button>
          
        </div>
        <input className="searchbar" type="text" placeholder="Search for a note by title" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        <div className="app-sidebar-notes">
          {dynamicSearch().map((note) => (
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
                  style={{ paddingTop: "4px" }}
                >
                  <DeleteIcon color="disabled" />
                </button>
              </div>
              {note.body && (
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {note.body.split("\n")[0].substring(0, 20) + "..."}
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
            {session ? (
              <div style={{display: 'flex', placeContent: 'space-between'}}>
                <span className="username"><br />{session.user?.email?.split("@")[0]}{" "}</span>
                <Button className="signout-button" variant="outlined" onClick={() => signOut()}>Sign Out</Button>
              </div>
            ) : (
              <Button className="signout-button" variant="outlined" onClick={() => handleSignIn()}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* {mobile view} */}

      <div className="app-sidenav" id="sidenav">
        <div className="app-sidebar-header">
          <h1>Notes</h1>
          <button
            onClick={() => {
              appContext!.onAddNote(session!.user!.email!);
            }}
          >
            <AddBoxIcon color="disabled" />
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
                  style={{ paddingTop: "4px" }}
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
            {session ? (
              <div>
                {session.user?.email}{" "}
                <Button className="save-button" variant="outlined" onClick={() => signOut()}>Sign Out</Button>
              </div>
            ) : (
              <button onClick={() => signIn()}>Sign In</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
