import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        borderBottom: '1px solid gray',
        padding: '10px 30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
      }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
        }}>
        <Link href="/">
          <h3 style={{ cursor: 'pointer' }}>Home</h3>
        </Link>
        <Link href="/projects">
          <h3 style={{ cursor: 'pointer' }}>Projects</h3>
        </Link>
      </div>
      <ConnectButton />
    </div>
  );
};

export default Navbar;
