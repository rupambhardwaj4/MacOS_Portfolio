import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useOS } from "#store/OSContext.jsx";

const FONT_WEIGHT = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = ({ text, className, baseWeight = 400 }) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{
        fontVariationSettings: `"wght" ${baseWeight}`,
        fontWeight: baseWeight,          // fallback
        display: "inline-block",         // needed for scale/y transforms
      }}
    >
      {char === "*" ? "\u00A0" : char}
    </span>
  ));
};

const setupTextHover = (container, type) => {
  if (!container) return;

  const letters = container.querySelectorAll("span");
  const { min, max } = FONT_WEIGHT[type];

  const animateLetter = (letter, intensity, duration = 0.2) => {
    const weight = min + (max - min) * intensity;

    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      // your original axis
      fontVariationSettings: `"wght" ${weight}`,
      // visible on any font
      fontWeight: weight,
      // make it VERY obvious visually:
      scale: 1 + intensity * 0.8,      // up to 1.8x bigger
      y: -intensity * 24,              // moves up on hover
      color: intensity > 0.1 ? "#ff4d4f" : "#ffffff", // red-ish near cursor
    });
  };

  const handleMouseMove = (e) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l + w / 2));

      // tighter field so effect is stronger
      const intensity = Math.exp(-(distance ** 2) / 600);

      animateLetter(letter, intensity);
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => animateLetter(letter, 0, 0.3));
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const Welcome = () => {
  const { bootSystem } = useOS();
  const welcomeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const cleanups = [];
    cleanups.push(setupTextHover(subtitleRef.current, "subtitle"));
    cleanups.push(setupTextHover(titleRef.current, "title"));

    return () => {
      cleanups.forEach((fn) => fn && fn());
    };
  }, []);

  const handleEnter = () => {
    gsap.to(welcomeRef.current, {
      opacity: 0,
      y: -40,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        bootSystem();
      },
    });
  };

  return (
    <section id="welcome" ref={welcomeRef}>
      <p ref={subtitleRef}>
        {renderText({
          text: "Hey,I'm Rupam! Welcome to my*",
          className: "text-3xl font-georana",
          baseWeight: 100,
        })}
      </p>

      <h1 ref={titleRef} className="mt-7">
        {renderText({
          text: "Portfolio",
          className: "text-8xl italic font-georana ",
        })}
      </h1>

      <button
        onClick={handleEnter}
        className="mt-12 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white rounded-full text-sm font-semibold tracking-wide transition-all shadow-md active:scale-95 duration-200 cursor-pointer backdrop-blur-md"
      >
        Start Experience
      </button>

      <div className="small-screen">
        This Portfolio is designed for Desktop/Tablet Screen only.
      </div>
    </section>
  );
};

export default Welcome;
