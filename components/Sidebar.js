import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Sidebar = () => {
    return (
      <div style={{ backgroundColor: '#8B8C89' }} className="sidebar min-h-screen p-4 h-full">
        <div className="logo-part flex flex-col items-center mt-5">
          <Link href="/" className="text-white text-lg mb-5">VeriCreds</Link>
          <Link href="/overview">
            <Image
              src="/logo.png"
              alt="VeriCred Logo"
              width={50}
              height={50}
            />
          </Link>
        </div>
        <ul className="ml-8 mt-8">
          <li className="mb-4 flex items-center">
            <Image
              src="/sidebar-all.png"
              alt="Logo 1"
              width={20}
              height={20}
              className="mr-2"
            />
            <Link href="/overview" className="text-white hover:text-black">All Docs</Link>
          </li>
          <li className="mb-4 flex items-center">
            <Image
              src="/sidebar-shared.png"
              alt="Logo 2"
              width={20}
              height={20}
              className="mr-2"
            />
            <Link href="/about" className="text-white hover:text-black">Shared Docs</Link>
          </li>
          <li className="mb-4 flex items-center">
            <Image
              src="/sidebar-verified.png"
              alt="Logo 3"
              width={20}
              height={20}
              className="mr-2"
            />
            <Link href="/contact" className="text-white hover:text-black">Verified Docs</Link>
          </li>
        </ul>
      </div>
    );
  }

  export default Sidebar;