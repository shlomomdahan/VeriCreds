import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEvmNativeBalance } from '@moralisweb3/next';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import AllCollections from '../components/AllCollections';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const address = process.env.NEXT_PUBLIC_WALLET_ADDRESS;
  const { data: nativeBalance } = useEvmNativeBalance({ address });

  return (
    <>
      <Head>
        <title>VeriCred</title>
        <meta name="description" content="VeriCred app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <div>
        <h3>Wallet: {address}</h3>
        <h3>Native Balance: {nativeBalance?.balance.ether} ETH</h3>
      </div> */}
      
      <div className="flex flex-col h-screen">
      <div className="topbar bg-gray-200 sticky top-0">
        <Topbar />
      </div>
      <div className="flex flex-grow">
        <div className="sidebar w-64 bg-gray-100">
          <Sidebar />
        </div>
        <div className="content flex-grow bg-white">
          <AllCollections />
        </div>
      </div>
    </div>
    </>
  )
}
