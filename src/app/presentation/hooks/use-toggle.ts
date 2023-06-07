import { useState, useCallback } from 'react';

export const useToggle = (
  initialState = false
): [
  boolean,
  () => void,
  { set: (value) => void; close: () => void; open: () => void }
] => {
  const [isOpen, setIsOpen] = useState(initialState);
  const toggle = useCallback(() => setIsOpen((prevState) => !prevState), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const set = useCallback((value) => setIsOpen(value), []);
  return [isOpen, toggle, { open, close, set }];
};
