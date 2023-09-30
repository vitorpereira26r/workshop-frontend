import React, { ReactNode } from 'react'
import { Navbar } from '../components/Navbar/Navbar'
import { Footer } from '../components/Footer/Footer';

interface PageProps {
    children: ReactNode;
}

export const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <div>
        <Navbar/>
        {children}
        <Footer/>
    </div>
  )
}
