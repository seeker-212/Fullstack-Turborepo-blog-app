import { PropsWithChildren } from "react";

type Props = PropsWithChildren;

const layout = ({ children }: Props) => {
  return (
    <div className="mt-24 flex flex-col justify-center items-center">
      {children}
    </div>
  );
};

export default layout;
