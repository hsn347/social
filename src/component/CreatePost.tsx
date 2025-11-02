import { useMutation } from "@tanstack/react-query";
import { useState, type ChangeEvent } from "react";
import { supabase } from "../CliantSupa";
import { useAuth } from "../context/AuthContext1";

interface interpost {
  title: string;
  content: string;
  user_id: string;
  avatar: string;
}

const createPost1 = async (post: interpost, ImageFile: File) => {
  const pathImage = `${post.title}-${Date.now()}-${ImageFile.name}`;

  const { error: uploadError } = await supabase.storage
    .from("bucket-images")
    .upload(pathImage, ImageFile);

  if (uploadError) throw new Error(uploadError.message);

  const { data: imageUrlData } = supabase.storage
    .from("bucket-images")
    .getPublicUrl(pathImage);

  const { error } = await supabase
    .from("posts")
    .insert({ ...post, image_url: imageUrlData.publicUrl });

  if (error) throw new Error(error.message);
};

export default function CreatePost() {
  const [title, setTitle] = useState<string>("");
  const [content, setcontent] = useState<string>("");
  const { user } = useAuth();
  const user_id = user?.user_metadata.user_name || user?.email;
  const avatar = user?.user_metadata.avatar_url;

  const [image, setImage] = useState<File | null>(null);

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: { post: interpost; imageFile: File }) => {
      return createPost1(data.post, data.imageFile);
    },
    onSuccess: () => {
      window.alert("Success");
    },
  });

  const hundleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!image) return;
    mutate({ post: { title, content, user_id, avatar }, imageFile: image });
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <>
      <form onSubmit={hundleSubmit} className="max-w-2xl mx-auto space-y-4">
        <div className="">
          <label className="block mb-2 font-medium">Title</label>
          <input
            type="text"
            id="title"
            onChange={(event) => setTitle(event.target.value)}
            className="w-full border border-white/10 bg-cyan-950 p-2 rounded"
            required
          />
        </div>
        <div className="">
          <label className="block mb-2 font-medium">Content</label>
          <textarea
            id="content"
            rows={5}
            onChange={(event) => setcontent(event.target.value)}
            className="w-full border border-white/10 bg-cyan-950 p-2 rounded"
            required
          />
        </div>
        <div className="">
          <label className="block mb-2 font-medium">Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImage}
            className="w-full text-gray-200 bg-cyan-950"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-purple-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          {isPending ? "Creating..." : "Create New Post"}
        </button>
        {isError && <p className="text-red-700">Erorr Creating Post</p>}
      </form>
    </>
  );
}
