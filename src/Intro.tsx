import React from "react";

const Intro = () => (
  <>
    <h2>Flipped</h2>
    <p>
      This component implements the{" "}
      <a href="https://aerotwist.com/blog/flip-your-animations/">
        FLIP technique
      </a>{" "}
      created by <a href="https://aerotwist.com/blog/">Paul Lewis</a>
    </p>
    <p>
      The <code>{`<Flipped>...</Flipped>`}</code> component is a simple wrapper
      to anything we want to transition when the UI gets re-rendered.
    </p>
    <p>
      In this example we are shuffling an array of numbers: each tiles gets
      smoothly transitioned to the new position when the array gets re-renered.
    </p>
  </>
);

export default Intro;
