import React, { FC } from "react";

interface Props {
  className?: string;
  duration?: number;
  easing?: "ease-in" | "ease-out" | "ease-in-out" | "linear";
  onEnter?: (ref: HTMLElement) => void;
  onClick?: (event: React.SyntheticEvent) => void;
}

const Flipped: FC<Props> = ({
  children,
  duration = 300,
  easing = "ease-out",
  onEnter,
  ...rest
}) => {
  const elRef = React.useRef<HTMLDivElement>(null);
  const element = elRef.current as Element | undefined;

  // reading the initial position
  const first = element && element.getBoundingClientRect();

  React.useLayoutEffect(() => {
    if (first) {
      const current = element.getBoundingClientRect();

      const deltaX = first.left - current.left;
      const deltaY = first.top - current.top;

      element.animate(
        [
          { transform: `translate(${deltaX}px, ${deltaY}px)` },
          { transform: "translate(0,0)" },
        ],
        {
          duration,
          easing,
        }
      );
    } else {
      if (onEnter) onEnter(elRef.current!);
    }
  }, [elRef, element, duration, easing, first, onEnter]);

  return (
    <div ref={elRef} {...rest}>
      {children}
    </div>
  );
};

export default Flipped;
