import React from 'react';
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Makufoods</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">
        {children}
      </main>
      <section>
        <About />
      </section>
      <section>
        <Contact />
      </section>
      <section>
        <Why />
      </section> 
      <footer>
        <Footer />
      </footer>
      <footer>
      </footer>
    </div>
  )
}

export default Layout
