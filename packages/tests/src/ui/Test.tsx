import React from "react";

type Props = {
  name: string;
};

const Test: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { children, name } = props;
  return (
    <div>
      <h2>{name}</h2>
      {children}
    </div>
  );
};

export default Test;
