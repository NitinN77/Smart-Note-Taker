import type { NextPage } from 'next'
import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'
import { useContext } from 'react'
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
      <Sidebar />
      <Main />
    </div>
  )
}

export default Home
