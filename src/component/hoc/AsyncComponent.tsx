import { FC, ReactElement } from "react";

interface IAsyncComponent {
  status: "loading" | "idle" | "error" | "success";
  component: ReactElement;
  skeleton?: ReactElement;
}

const AsyncComponent: FC<IAsyncComponent> = ({
  status,
  component,
  skeleton,
}) => {
  if (status === "loading") {
    return skeleton ? skeleton : <p>"Loading..."</p>;
  } else if (status === "error") {
    throw new Error("Network Error");
  }

  return component;
};

export default AsyncComponent;
