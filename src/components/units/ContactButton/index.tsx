'use client';

import React from 'react';
import Button from '@/components/elements/Button';

const ContactButton = () => {
  return (
    <Button
      className="bg-green-100"
      onClick={() => (window.location.href = 'mailto:info@travelbook.com')}
    >
      info@travel.com
    </Button>
  );
};

export default ContactButton;
