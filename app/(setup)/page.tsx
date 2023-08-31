import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import InitialModal from "@/components/modals/InitialModal";

const Page = async () => {
  // GET USEER PROFILE DETAILS
  const profile = await initialProfile();

  // FIND SERVER USER BELONGS
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  // IF SERVERS ARE AVALIABLE ROUTE TO SERVER
  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  // CREATE SERVER MODAL
  return <InitialModal />;
};
export default Page;
