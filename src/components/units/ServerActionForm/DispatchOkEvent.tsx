'use client';

import { useEffect } from 'react';
import { useFormStateCtx } from '@/components/units/ServerActionForm';

export default function DispatchOkEvent({
  eventName = 'user-updated',
}: {
  eventName?: string;
}) {
  const { ok } = useFormStateCtx();

  useEffect(() => {
    if (ok) {
      window.dispatchEvent(new CustomEvent(eventName));
    }
  }, [ok, eventName]);

  return null;
}
