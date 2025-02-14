import React from 'react';
import Header from '@/components/modules/Header';
import Footer from '@/components/modules/Footer';

type TMainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<TMainLayoutProps> = ({ children }) => {
  return (
    <section className="w-full min-h-screen">
      <Header />
      {children}
      <Footer />
    </section>
  );
};

export default MainLayout;
