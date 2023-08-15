"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"

//use an object to store all arguments so they do not get mixed up
interface Params {
  userId: string,
  username: string,
  name: string,
  bio: string,
  image: string,
  path: string,
}
export async function updateUser({
  userId, username, name, bio, image, path
}: Params): Promise<void> {
  console.log("updateUser()...");
  connectToDB();

  //typo in the new user attributes will not trigger error!!!
  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),//MUST be all lowercases
        name,
        bio,
        image,
        onboarded: true
      },
      { upsert: true },//to insert if it does not exist, or update if it exist!
    );

    //https://nextjs.org/docs/app/api-reference/functions/revalidatePath
    if (path === '/profile/edit') {
      revalidatePath(path);
    }
    console.log("updateUser() is successful");
  } catch (error: any) {
    console.log('user.actions.ts: findOneAndUpdate() failed:', error);
    throw new Error('Failed to upsert user: ${error.message}');
  }
}

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userId })
    // .populate({
    //   path: 'communities',
    //   model: Community
    // })
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}