import React from "react";
import Flipped from "./components/Flipped/Flipped";
import Intro from "./Intro";
import "./App.css";
import Grid from "./layouts/Grid";

// generating some dummy data
const values = Array.from(Array(30)).map((value, index) => index);
const shuffle = () => Math.random() - 0.5;
const numSort = (a: number, b: number) => a - b;

export default function App() {
  const [arr, setArr] = React.useState(values);
  const [disposedArr, setDisposedArr] = React.useState<number[]>([]);

  function shuffleArray() {
    setArr([...arr.sort(shuffle)]);
  }

  function dispose(v: number) {
    return () => {
      setDisposedArr([...disposedArr, v].sort(numSort));
      setArr([...arr.filter((item) => item !== v)]);
    };
  }

  function restore(v: number) {
    return () => {
      setArr([...arr, v].sort(numSort));
      setDisposedArr([...disposedArr.filter((item) => item !== v)]);
    };
  }

  function onEnter(el: HTMLElement) {
    // on enter animation
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    el.animate(
      [
        { opacity: 0, transform: `translate(${x}px,${y}px)` },
        { opacity: 1, transform: `translate(0px,0px)` },
      ],
      {
        duration: 800,
        easing: "ease-out",
      }
    );
  }

  return (
    <div className="App">
      <Grid cols={2}>
        <div className="readme">
          <Intro />
        </div>
        <div className="wrapper">
          {arr.map((v) => (
            <Flipped
              key={v}
              duration={400}
              easing="ease-in-out"
              onEnter={onEnter}
              onClick={dispose(v)}
            >
              <div className="tile">{v}</div>
            </Flipped>
          ))}
        </div>
        <div>
          <button onClick={shuffleArray}>Shuffle</button>
        </div>
        <div className="container">
          {disposedArr.map((v) => (
            <Flipped
              key={v}
              duration={400}
              easing="ease-in-out"
              onEnter={onEnter}
              onClick={restore(v)}
            >
              <div className="tile">{v}</div>
            </Flipped>
          ))}
        </div>
      </Grid>
    </div>
  );
}
