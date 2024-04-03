import { useEffect } from 'react';

export default function useOutsideAlerter(ref: any, onOutsideClick: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref && !ref.contains(event.target)) {
          onOutsideClick(); // Ensure onOutsideClick is a function that returns void
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, onOutsideClick]);
  }
  