// Entradas cortas: poco desplazamiento y ease-out; el contenido no espera más de ~0.3 s.
const ease = "easeOut" as const;

export function slideInFromLeft(delay: number) {
  return {
    hidden: { x: -24, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { delay, duration: 0.4, ease },
    },
  };
}

export function slideInFromRight(delay: number) {
  return {
    hidden: { x: 24, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { delay, duration: 0.4, ease },
    },
  };
}

export const slideInFromTop = {
  hidden: { y: -16, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.1, duration: 0.4, ease },
  },
};
