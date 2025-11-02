import { useQuery } from "@tanstack/react-query";
import { supabase } from "../CliantSupa";

interface Display {
  content: string;
  post_id: number;
  user_id: string;
  auther: string;
  avatar_Comment: string;
  created_at: string;
}

const dis = async (postId: number): Promise<Display[]> => {
  const { data, error } = await supabase
    .from("comment")
    .select("*")
    .eq("post_id", postId)
    .order("content", { ascending: true });

  if (error) throw new Error("ERROR");

  return data as Display[];
};
function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (seconds < 60) return "منذ لحظات";
  if (minutes < 60)
    return `منذ ${minutes} دقيقة${
      minutes === 1 ? "" : minutes < 11 ? "s" : ""
    }`;
  if (hours < 24)
    return `منذ ${hours} ساعة${hours === 1 ? "" : hours < 11 ? "s" : ""}`;
  if (days < 30)
    return `منذ ${days} يوم${days === 1 ? "" : days < 11 ? "s" : ""}`;

  // For longer periods, show the date
  return date.toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function DisplayComments({ postId }: { postId: number }) {
  const { data, isLoading, isError } = useQuery<Display[], Error>({
    queryKey: ["comments", postId],
    queryFn: () => dis(postId),
  });
  return (
    <>
      <div className="max-w-2xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-100">التعليقات</h2>
        <div className="space-y-6">
          {isLoading && (
            <div className="text-gray-500">جارٍ تحميل التعليقات...</div>
          )}
          {isError && (
            <div className="text-red-500">حدث خطأ أثناء تحميل التعليقات</div>
          )}
          {data?.map((one, id1) => (
            <div
              key={id1}
              className="flex items-start bg-gray-800 rounded-xl shadow-lg p-5 hover:shadow-2xl transition-shadow"
            >
              <img
                src={one.avatar_Comment}
                alt={one.auther}
                className="w-12 h-12 rounded-full border-2 border-blue-400 shadow-inner object-cover"
              />
              <div className="ml-4 flex-1">
                <div className="flex items-center mb-1">
                  <span className="font-semibold text-blue-300">
                    {one.auther}
                  </span>
                  <span className="mx-2 text-gray-500 text-xs">•</span>
                  <span className="text-gray-400 text-xs">
                    {formatDate(one.created_at)}
                  </span>
                </div>
                <p className="text-gray-200 bg-gray-900 rounded-lg px-4 py-2 shadow-inner">
                  {one.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
