"use client";

import { useState, useEffect } from "react";

interface TypingRolesProps {
  roles: string[];
}

export default function TypingRoles({ roles }: TypingRolesProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let typingSpeed = isDeleting ? 45 : 90;

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word before deleting
      const pauseTimer = setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting && charIndex === 0) {
      // Move to next role
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timer = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex, roles]);

  const currentText = roles[roleIndex].substring(0, charIndex);

  return (
    <span className="inline-flex items-center">
      <span className="text-gradient-vos font-bold">
        {currentText}
      </span>
      {/* Blinking Cursor Bar */}
      <span className="inline-block w-[3px] h-[1.15em] bg-[#F1BF00] ml-1 rounded-sm animate-pulse" />
    </span>
  );
}

