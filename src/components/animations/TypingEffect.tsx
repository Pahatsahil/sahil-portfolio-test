import { useState, useEffect } from "react";

interface TypingEffectProps {
  words: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
}

const TypingEffect = ({
  words,
  speed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
}: TypingEffectProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < word.length) {
            setCurrentText(word.slice(0, currentText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed,
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    currentWordIndex,
    isDeleting,
    words,
    speed,
    deleteSpeed,
    pauseDuration,
  ]);

  return (
    <span className="text-gradient">
      {currentText}
      <span className="cursor-blink text-[#61dafb]">|</span>
    </span>
  );
};

export default TypingEffect;
