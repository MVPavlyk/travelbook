'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';

export default function SubmitButton({
  children = 'Submit',
}: {
  children?: React.ReactNode;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-500 text-white w-full p-2 rounded-md hover:bg-blue-600 transition disabled:opacity-60"
    >
      {pending ? 'Processing…' : children}
    </button>
  );
}
