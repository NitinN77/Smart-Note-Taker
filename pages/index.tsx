import type { NextPage } from 'next'
import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'
import { useContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import AppContext from '../util/AppContext'

import { collection, DocumentData, deleteDoc , onSnapshot, orderBy, query, setDoc, doc, getDocs } from "firebase/firestore"; 
import { db } from "../util/firebase"
import { Note } from '../util/interfaces'

const Home = ({ newNotes }) => {

  const {data: session} = useSession();
  const appContext = useContext(AppContext);

  useEffect(() => {
    appContext?.setNotes(newNotes)
  }, [newNotes])
  

  return (
    <div className="App">
      <Head>
        <title>Note Taker</title>
        <meta name="description" content="note taking app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <Main />
    </div>
  )
}

export async function getServerSideProps() {
  let newNotes: Note[] = [];
  const querySnapshot = await getDocs(collection(db, "notes"));
  querySnapshot.forEach((doc) => {
    newNotes.push(doc.data() as Note)
  });
  return {
    props: {newNotes}
  }
}

export default Home


