import React, { useState, useEffect } from 'react';
import "./Typewriter.css"



const Typewriter = ({ strings, speed = 100, delay = 1000 }) => {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;

    const typeOrDelete = () => {
      const currentString = strings[currentStringIndex];
      const action = isDeleting ? 'delete' : 'type';

      if (action === 'type') {
        if (displayedText.length < currentString.length) {
          setDisplayedText(currentString.substring(0, displayedText.length + 1));
          timer = setTimeout(typeOrDelete, speed);
        } else {
          timer = setTimeout(() => setIsDeleting(true), delay);
        }
      } else if (action === 'delete') {
        if (displayedText.length > 0) {
          setDisplayedText(currentString.substring(0, displayedText.length - 1));
          timer = setTimeout(typeOrDelete, speed / 2);
        } else {
          setIsDeleting(false);
          setCurrentStringIndex((currentStringIndex + 1) % strings.length);
        }
      }
    };

    timer = setTimeout(typeOrDelete, speed);

    return () => clearTimeout(timer);
  }, [currentStringIndex, displayedText, isDeleting, strings, speed, delay]);

  return <p class='typer'>{displayedText}</p>
};

export default Typewriter;