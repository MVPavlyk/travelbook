'use client';

import { useEffect } from 'react';
import { useFormStateCtx } from '@/components/units/ServerActionForm';

export default function DispatchOkEvent({ eventName }: { eventName: string }) {
  const { ok, data } = useFormStateCtx() as { ok?: boolean; data?: any };
  useEffect(() => {
    if (ok) window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
  }, [ok, data, eventName]);
  return null;
}
