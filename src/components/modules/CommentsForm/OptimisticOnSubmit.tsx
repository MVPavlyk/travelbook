'use client';

import { nanoid } from 'nanoid';
import { useEffect, useRef } from 'react';

export default function OptimisticOnSubmit() {
  const anchorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const form = anchorRef.current?.closest('form') as HTMLFormElement | null;
    if (!form) return;

    const onFormData = (e: Event) => {
      const fe = e as FormDataEvent;
      const fd = fe.formData;

      const postId = String(fd.get('postId') ?? '');
      const text = String(fd.get('text') ?? '').trim();
      if (!postId || !text) return;

      const files = (fd.getAll('images') as File[]).filter(
        (f) => f && f.size > 0
      );
      const tempId = `temp-${nanoid(8)}`;
      const detail = {
        tempId,
        postId,
        text,
        previews: files.map((f) => URL.createObjectURL(f)),
        createdAt: new Date().toISOString(),
      };

      window.dispatchEvent(new CustomEvent('comment:creating', { detail }));

      setTimeout(() => {
        form.reset();
        form.dispatchEvent(new Event('reset', { bubbles: true }));
      }, 0);
    };

    form.addEventListener('formdata', onFormData as EventListener);
    return () =>
      form.removeEventListener('formdata', onFormData as EventListener);
  }, []);

  return <span ref={anchorRef} className="hidden" />;
}
