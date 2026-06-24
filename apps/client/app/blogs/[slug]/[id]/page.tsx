type Props = {
  params: {
    id: string;
  };
};

const PostPage = async ({ params }: Props) => {
  const postId = (await params).id;
  return <div></div>;
};

export default PostPage;
