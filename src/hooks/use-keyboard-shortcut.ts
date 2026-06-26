import { useEffect } from 'react';

type KeyboardShortcutOptions = {
  ctrlOrMetaKey?: boolean;
  preventDefault?: boolean;
};

export function useKeyboardShortcut(
  key: string,
  callback: (event: KeyboardEvent) => void,
  options: KeyboardShortcutOptions = {}
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== key.toLowerCase()) {
        return;
      }
      
      if (options.ctrlOrMetaKey && !event.metaKey && !event.ctrlKey) {
        return;
      }

      if (options.preventDefault) {
        event.preventDefault();
      }
      
      callback(event);
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [key, callback, options]);
}
