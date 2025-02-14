import React from 'react';
import ContactButton from '@/components/units/ContactButton';

const Footer = () => {
  return (
    <footer className="w-full px-60 h-[460px] flex justify-between items-center main-footer">
      <h2 className="w-[560px] text-5xl text-white font-bold">
        Travel beyond your imagination, with TravelBook!
      </h2>
      <div className="flex flex-col gap-y-5">
        <h4 className="text-white font-bold text-lg">Contact</h4>
        <ContactButton />
        <h4 className="text-white font-bold text-lg">+ 01 483 593 284</h4>
      </div>
    </footer>
  );
};

export default Footer;
