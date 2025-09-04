export const UI_EVENTS = {
  comment: {
    creating: 'comment:creating',
    created: 'comment:created',
    failed: 'comment:failed',
  },
  user: {
    updated: 'user:updated',
  },
} as const;

export type UiEventDomain = keyof typeof UI_EVENTS;
export type UiEventMap<D extends UiEventDomain = UiEventDomain> =
  (typeof UI_EVENTS)[D];
export type UiEventName = UiEventMap[keyof UiEventMap];
