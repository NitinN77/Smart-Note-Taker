import { Note } from "../util/interfaces";
import ReactMarkdown from "react-markdown";
import { useContext, useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import AppContext from "../util/AppContext";
import { Button, IconButton, Input } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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

  useEffect(() => {
    if (session) {
      appContext!.setUser(session.user!.email);
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

  const toggleSidebar = () => {
    const mainContainer = Array.from(document.getElementsByClassName('main-parent') as HTMLCollectionOf<HTMLElement>)
    if(!toggle) {
      document.getElementById('sidebar')!.style.display = 'inline';
      document.getElementById('sidebar')!.style.width = '100vw';
      mainContainer[0].style.display = 'none'
    } else {
      document.getElementById('sidebar')!.style.display = 'none';
      mainContainer[0].style.display = 'block'
    }
    setToggle(!toggle)
  }

  return (
    <>


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
                <Button style={{marginBottom:"20px",border:"#7F6BFF solid 1px",color:"#7F6BFF",padding:"0rem 2rem"}} variant="outlined" onClick={() => signOut()}>Sign Out</Button>
              </div>
            ) : (
              <Button style={{marginBottom:"20px",border:"#7F6BFF solid 1px",color:"#7F6BFF",padding:"0rem 2rem", float: "right", height: "3rem"}} variant="outlined" onClick={() => handleSignIn()}>
                Sign In
              </Button>
            )}
          </div>

        </div>
        

      </div>
      <IconButton onClick={() => {toggleSidebar()}} className="toggle-button">
        <ChevronRightIcon />
      </IconButton>

    </>
  );
};

export default Sidebar;
