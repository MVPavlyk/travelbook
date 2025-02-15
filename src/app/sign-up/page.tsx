import React from 'react';
import Header from '@/components/modules/Header';
import RegistrationForm from '@/components/modules/RegistrationForm';

const Page = () => {
  return (
    <>
      <Header />
      <section className="h-[calc(100vh-80px)] w-full flex">
        <div className="w-1/2 h-full login-bg" />
        <section className="w-1/2 h-full bg-white relative shadow-xl flex items-center justify-center pb-20">
          <RegistrationForm />
        </section>
      </section>
    </>
  );
};

export default Page;
