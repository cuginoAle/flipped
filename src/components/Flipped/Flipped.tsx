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
      const ratioW = first.width / current.width;
      const ratioH = first.height / current.height;

      element.animate(
        [
          {
            transform: `translate(${deltaX}px, ${deltaY}px) scale(${ratioW}, ${ratioH})`,
          },
          { transform: "translate(0,0)  scale(1, 1)" },
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

  React.useLayoutEffect(() => {
    elRef.current!.style.willChange = "transform, opacity";
    elRef.current!.style.transformOrigin = "0 0";
  }, [elRef]);

  return (
    <div ref={elRef} {...rest}>
      {children}
    </div>
  );
};

export default Flipped;
