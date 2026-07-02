import SubmitButton from "@/components/SignUpButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveComment } from "@/lib/actions/commentAction";
import { SessionUser } from "@/lib/session";
import { CommentEntity } from "@/lib/types/modelTypes";
import { cn } from "@/lib/utils";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

type Props = {
  postId: number;
  user: SessionUser;
  className?: string;
  refetch: (options?: RefetchOptions) => Promise<
    QueryObserverResult<{
      comments: CommentEntity[];
      count: number;
    }>
  >;
};

const AddComment = (props: Props) => {
  const [state, action] = useActionState(saveComment, undefined);

  useEffect(() => {
    const handleState = async () => {
      if (!state) return;

      if (state.ok) {
        props.refetch();
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    };

    handleState();
  }, [state, props]);
  return (
    <Dialog open={state?.open}>
      <DialogTrigger asChild>
        <Button>Leave Your Comment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Write Your Comment</DialogTitle>
        <form action={action} className={cn(props.className)}>
          <input name="postId" defaultValue={props.postId} hidden />
          <Label htmlFor="comment">Your Comment</Label>
          <div className="border-t border-x rounded-t-md">
            <Textarea
              className="border-none active:outline-none focus-visible:ring-0 shadow-none"
              name="content"
            />
            {!!state?.errors?.content && (
              <p className="text-red-500 animate-shake">
                {state.errors.content}
              </p>
            )}
          </div>
          <p className="border rounded-b-md p-2">
            <span className="text-slate-400">Write as: </span>
            <span className="text-slate-700">{props.user.name}</span>
          </p>
          <SubmitButton className="mt-2">Submit</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddComment;
