import React, { useEffect, useState } from "react";
import usePersistentEffect from "../../../use-persistent-effect/src";

const simulateFetch = async (where: string): Promise<"response"> =>
  new Promise((resolve) => {
    console.log(`simulateFetch / start @ ${where}`);
    setTimeout(() => {
      console.log(`simulateFetch / end   @ ${where}`);
      resolve("response");
    }, 2500);
  });

const UsePersistentEffectTest: React.FC = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h3>useEffect</h3>
      <p>
        Should show 2 initially due to react strict mode running the effect
        twice:
      </p>
      <UseEffectSample count={count} />
      <h3>usePersistentEffect</h3>
      <p>Should show 1 initially even in react strict mode:</p>
      <UsePersistentEffectSample count={count} />
      <h3>Controls</h3>
      <p>Increment a dummy counter to trigger a re-render</p>
      <div>Counter: {count}</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

type SampleProps = {
  count: number;
};

const UseEffectSample: React.FC<SampleProps> = (props) => {
  const { count } = props;
  const [fetchesStart, setFetchesStart] = useState(0);
  const [fetchesEnd, setFetchesEnd] = useState(0);
  useEffect(() => {
    setFetchesStart((val) => val + 1);
    simulateFetch("useEffect").then(() => {
      setFetchesEnd((val) => val + 1);
    });
  }, [count]);
  return <Display start={fetchesStart} end={fetchesEnd} />;
};

const UsePersistentEffectSample: React.FC<SampleProps> = (props) => {
  const { count } = props;
  const [fetchesStart, setFetchesStart] = useState(0);
  const [fetchesEnd, setFetchesEnd] = useState(0);
  usePersistentEffect(() => {
    setFetchesStart((val) => val + 1);
    simulateFetch("usePersistentEffect").then(() => {
      setFetchesEnd((val) => val + 1);
    });
  }, [count]);
  return <Display start={fetchesStart} end={fetchesEnd} />;
};

type DisplayProps = {
  start: number;
  end: number;
};

const Display: React.FC<DisplayProps> = (props) => {
  const { start, end } = props;
  return (
    <div>
      <div>Start: {start}</div>
      <div>End: {end}</div>
    </div>
  );
};

export default UsePersistentEffectTest;
