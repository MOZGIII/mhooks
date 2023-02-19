import React from "react";

const Tests: React.FC<React.PropsWithChildren<Record<never, never>>> = (
  props
) => {
  const { children } = props;
  return (
    <div>
      <h1>Tests</h1>
      {children}
    </div>
  );
};

export default Tests;
