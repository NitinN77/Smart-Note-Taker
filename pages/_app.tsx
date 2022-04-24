// @ts-nocheck
import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppContext from "../util/AppContext";
import { SessionProvider } from "next-auth/react";
import { Note, AppContextInterface } from '../util/interfaces'
import { useEffect, useState } from "react";
const uuid = require('react-uuid');
import { useSession, signIn, signOut } from "next-auth/react"
import emailjs from 'emailjs-com';

import { collection, DocumentData, deleteDoc , onSnapshot, orderBy, query, setDoc, doc, getDoc } from "firebase/firestore"; 
import { db } from "../util/firebase"


function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<any>();

  const [user, setUser] = useState<any>(null)
  
  const onAddNote = (user: string): void => {
    const newNote: Note = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
      author: user
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

  const onDeleteNote = (idToDelete: Note): void => {
    setNotes(notes.filter((note) => note.id !== idToDelete.id))
    deleteNote(idToDelete);
  }

  const getActiveNote = (): Note | undefined => {
    return notes.find((note) => note.id === activeNote);
  }
  
  const getNotes = (): void => {
    onSnapshot(query(collection(db, 'notes'), orderBy('lastModified', 'desc')), snapshot => {
      var newNotes: DocumentData[] = [];
      snapshot.docs.map(doc => {
        newNotes.push(doc.data());
      });
      setNotes(newNotes as Note[]);
    })
  }

  const writeNote = async (note: Note): Promise<void> => {
    try {
      const docRef = await setDoc(doc(db, "notes", note.id.toLocaleString()), note);
    } catch (e) {
      alert(e);
    }
  }

  const writeAllNotes = () => {
    notes.map(note => writeNote(note))
  }
  
  const deleteNote = async (note: Note): Promise<void> => {
    await deleteDoc(doc(db, "notes", note.id.toLocaleString()));
  }

  const updateUser = async(email: string) : Promise<void> => {
    if (appContext!.state.notes.length > 10){
      alert("You've used up your free storage(Max: 10). Notes Count: " + appContext!.state.notes.length )
    } 
    try {
      const docNewRef = await setDoc(doc(db, "users", email), {notesCount: appContext!.state.notes.length});
      writeAllNotes();
    } catch (e) {
      alert(e);
    }
  }

  const appContext: AppContextInterface = {state: {
      notes,
      activeNote,
      user
    },
    setUser,
    setNotes,
    onAddNote,
    setActiveNote,
    onUpdateNote,
    onDeleteNote,
    getActiveNote,
    writeNote,
    writeAllNotes,
    updateUser
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
