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
  const [enlargeddArr, setEnlargedArr] = React.useState<number[]>([]);

  function shuffleArray() {
    setArr([...arr.sort(shuffle)]);
  }

  function enlarge(v: number) {
    return () => {
      const i = enlargeddArr.indexOf(v);

      if (i > -1) {
        setEnlargedArr([
          ...enlargeddArr.slice(0, i),
          ...enlargeddArr.slice(i + 1),
        ]);
      } else {
        setEnlargedArr([...enlargeddArr, v]);
      }
    };
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

  React.useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setEnlargedArr([i]);
      i++;
      if (i > values.length - 1) {
        i = 0;
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        {arr.map((v, index) => {
          const classes = ["tile"];
          const i = enlargeddArr.indexOf(v);

          if (i !== -1) classes.push("enlarged");
          if (index === enlargeddArr[0] - 1) classes.push("prev");
          if (index === enlargeddArr[0] + 1) classes.push("next");

          return (
            <Flipped
              key={v}
              className={classes.join(" ")}
              duration={400}
              easing="ease-in-out"
              onEnter={onEnter}
              onClick={enlarge(v)}
            >
              {/* <div className="tile">{v}</div> */}
              <img
                src={`https://source.unsplash.com/random/?city,night&sig=${v}`}
                alt="random"
              />
            </Flipped>
          );
        })}
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
    </div>
  );
}
