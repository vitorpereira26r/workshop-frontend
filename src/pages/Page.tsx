import React, { ReactNode } from 'react'
import { Navbar } from '../components/Navbar/Navbar'
import "./Page.css"

interface PageProps {
    children: ReactNode;
}

export const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <div className="page">
      <Navbar />
        <div className="content">
          <main>{children}</main>
        </div>
    </div>
  )
}
