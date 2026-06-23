type Props = {
  totalPages: number;
  currentPages: number;
  pageNeighbors?: number;
  className: string;
};

const Pagination = ({
  totalPages,
  currentPages,
  pageNeighbors = 2,
  className,
}: Props) => {
  return <div></div>;
};

export default Pagination;
