import type { NextPage } from 'next'
import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'
import { useState } from 'react'
import { SideNotes, Note } from '../util/interfaces'

const uuid = require('react-uuid')


const Home: NextPage = () => {

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

  return (
    <div className="App">
      <Head>
        <title>Note Taker</title>
        <meta name="description" content="note taking app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar 
      notes={notes} 
      onAddNote={onAddNote} 
      onDeleteNote={onDeleteNote}
      activeNote={activeNote}
      setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} 
      onUpdateNote={onUpdateNote}/>
      
    </div>
  )
}

export default Home
