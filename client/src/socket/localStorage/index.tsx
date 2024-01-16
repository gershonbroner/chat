import { useEffect, useState } from "react";

const PREFIX = 'chat-clone-';

export default function useLocalStorage(key:string|undefined, initialValue?:any) {
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    try {
      const jsonValue = localStorage.getItem(prefixedKey);
      return jsonValue != null ? JSON.parse(jsonValue) : initialValue;
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    if(value === undefined)return;
    try {
      localStorage.setItem(prefixedKey, JSON.stringify(value));
    } catch (error) {
      console.error("Error storing data in localStorage:", error);
    }
  }, [prefixedKey, value]);

  return [value, setValue];
}
