import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppContext from "../util/AppContext";
import { SessionProvider } from "next-auth/react";
import { SideNotes, Note, AppContextInterface } from '../util/interfaces'
import { useState } from "react";

const uuid = require('react-uuid')

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  const [notes, setNotes] = useState<SideNotes["notes"]>([]);
  const [activeNote, setActiveNote] = useState<any>();

  
  const onAddNote = (): void => {
    const newNote: Note = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now()
    };
    setNotes([newNote, ...notes]);
  }

  const onUpdateNote = (updatedNote: Note): Note | void => {
    const updatedNotesArray = notes.map((note) => {
      if(note.id === activeNote) {
        return updatedNote;
      }
      return note;
    })
    setNotes(updatedNotesArray);
  }

  const onDeleteNote = (idToDelete: number): void => {
    setNotes(notes.filter((note) => note.id !== idToDelete))
  }

  const getActiveNote = (): any => {
    return notes.find((note) => note.id === activeNote);
  }

  const appContext: AppContextInterface = {state: {
      notes,
      activeNote,
    },
    setNotes,
    onAddNote,
    setActiveNote,
    onUpdateNote,
    onDeleteNote,
    getActiveNote
  }

  return (
    <SessionProvider session={session}>
      <AppContext.Provider value={appContext}>
        <Component {...pageProps} />
      </AppContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;
