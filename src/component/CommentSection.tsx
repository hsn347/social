import { useState } from "react";
import { useAuth } from "../context/AuthContext1";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../CliantSupa";

interface props {
  postId: number;
}

interface NewComment {
  content: string;
  avatar_Comment: string;
  presentComment: number | null;
}

const CreatenewComment = async (
  newComment: NewComment,
  postId: number,
  userId?: string,
  auther?: string
) => {
  if (!userId || !auther) {
    throw new Error("ERROR COMMENT");
  }
  const { data: quise } = await supabase
    .from("comment")
    .select("*")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .maybeSingle();

  if (quise) {
    const { error } = await supabase
      .from("comment")
      .update({
        content: newComment.content,
      })
      .eq("id", quise.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("comment").insert({
      post_id: postId,
      content: newComment.content,
      user_id: userId,
      auther: auther,
      present_coment: newComment.presentComment || null,
      avatar_Comment: newComment.avatar_Comment,
    });
    if (error) throw new Error(error.message);
  }
};

export default function CommentSection({ postId }: props) {
  const { user } = useAuth();
  const [content1, setContent] = useState<string>("");
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (newComment: NewComment) =>
      CreatenewComment(newComment, postId, user?.id, user?.user_metadata?.name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content1) return;
    mutate({
      content: content1,
      avatar_Comment: user?.user_metadata.avatar_url || "",
      presentComment: null,
    });

    setContent("");
  };

  return (
    <>
      <div className="comment-section">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {user ? (
          <form onSubmit={handleSubmit}>
            <textarea
              value={content1}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={!content1}
            >
              {isPending ? "Post..." : "Post Comment"}
            </button>
            {isError && <p>ERROR POST</p>}
          </form>
        ) : (
          <p>Must be user</p>
        )}
      </div>
    </>
  );
}
