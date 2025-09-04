'use client';

import { nanoid } from 'nanoid';
import { useEffect, useRef } from 'react';
import { UI_EVENTS } from '@/lib/constants/uiEvents';

export default function OptimisticOnSubmit() {
  const anchorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const formElement = anchorRef.current?.closest(
      'form'
    ) as HTMLFormElement | null;
    if (!formElement) return;

    const handleFormData = (event: Event) => {
      const formDataEvent = event as FormDataEvent;
      const formData = formDataEvent.formData;

      const postId = String(formData.get('postId') ?? '');
      const text = String(formData.get('text') ?? '').trim();
      if (!postId || !text) return;

      const imageFiles = (formData.getAll('images') as File[]).filter(
        (file) => file && file.size > 0
      );

      const tempId = `temp-${nanoid(8)}`;
      formData.set('clientTempId', tempId);

      const detail = {
        tempId,
        postId,
        text,
        previews: imageFiles.map((file) => URL.createObjectURL(file)),
        createdAt: new Date().toISOString(),
      };

      window.dispatchEvent(
        new CustomEvent(UI_EVENTS.comment.creating, { detail })
      );

      setTimeout(() => {
        formElement.reset();
        formElement.dispatchEvent(new Event('reset', { bubbles: true }));
      }, 0);
    };

    formElement.addEventListener('formdata', handleFormData as EventListener);
    return () => {
      formElement.removeEventListener(
        'formdata',
        handleFormData as EventListener
      );
    };
  }, []);

  return <span ref={anchorRef} className="hidden" />;
}
