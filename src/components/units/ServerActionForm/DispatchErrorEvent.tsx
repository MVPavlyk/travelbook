'use client';

import { useEffect } from 'react';
import { useFormStateCtx } from '@/components/units/ServerActionForm';

export default function DispatchErrorEvent({
  eventName,
}: {
  eventName: string;
}) {
  const { serverError, data } = useFormStateCtx() as {
    serverError?: string;
    data?: any;
  };
  useEffect(() => {
    if (serverError)
      window.dispatchEvent(
        new CustomEvent(eventName, { detail: { ...data, serverError } })
      );
  }, [serverError, data, eventName]);
  return null;
}
