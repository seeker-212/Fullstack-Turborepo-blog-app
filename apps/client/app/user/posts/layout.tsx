import React, { PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren<{
  modal: ReactNode;
}>;

const PostLayout = ({ children, modal }: Props) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default PostLayout;
