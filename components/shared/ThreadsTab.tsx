import { fetchUserThreads } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  let data = await fetchUserThreads(accountId);

  if (!data) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {data.threads.map((thread: any) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === "User"
              ? { name: data.name, image: data.image, id: data.id }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          } // todo
          community={thread.community} // todo
          createdAt={thread.createdAt}
          comments={thread.comments}
        />
      ))}
    </section>
  );
};

export default ThreadsTab;
