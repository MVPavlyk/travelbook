'use client';

import React, { createContext, useContext } from 'react';
import { useActionState } from 'react';
import { FormState } from '@/lib/types/form';

const FormStateCtx = createContext<FormState>({});

export function useFormStateCtx() {
  return useContext(FormStateCtx);
}

type ServerActionFormProps = {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  initialState?: FormState;
  className?: string;
  children: React.ReactNode;
  noValidate?: boolean;
};

export default function ServerActionForm({
  action,
  initialState = {},
  className,
  noValidate = true,
  children,
}: ServerActionFormProps) {
  const [state, formAction] = useActionState<FormState, FormData>(
    action,
    initialState
  );

  return (
    <FormStateCtx.Provider value={state}>
      <form action={formAction} className={className} noValidate={noValidate}>
        {children}
      </form>
    </FormStateCtx.Provider>
  );
}
