import type { NextPage } from 'next'
import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'
import { useContext, useState } from 'react'
import { SideNotes, Note } from '../util/interfaces'
import { useSession } from 'next-auth/react'
import AppContext from '../util/AppContext'

const Home: NextPage = () => {

  const {data: session} = useSession();
  
  const appContext = useContext(AppContext);

  return (
    <div className="App">
      <Head>
        <title>Note Taker</title>
        <meta name="description" content="note taking app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar 
      notes={appContext!.state.notes} 
      onAddNote={appContext!.onAddNote} 
      onDeleteNote={appContext!.onDeleteNote}
      activeNote={appContext!.state.activeNote}
      setActiveNote={appContext!.setActiveNote}
      />
      <Main activeNote={appContext!.getActiveNote()} 
      onUpdateNote={appContext!.onUpdateNote}/>
    </div>
  )
}

export default Home
