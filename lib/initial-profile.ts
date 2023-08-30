import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "./db";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  const profile = await db.profile.findUnique({ where: { userId: user.id } });

  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`, // Add a value for the 'name' property
      imageUrl: user.imageUrl, // Add a value for the 'imageUrl' property
      email: user.emailAddresses[0].emailAddress, // Add a value for the 'email' property
    },
  });

  return newProfile; // Return the newly created profile
};
