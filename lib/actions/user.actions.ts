"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    console.log("Session created:", session);
    return parseStringify(session);
  } catch (error) {
    console.error("Error in signIn:", error);
    throw error;
  }
};

export const signUp = async (userData: SignUpParams) => {
  try {
    // Create user in Appwrite

    const { account } = await createAdminClient();

    const { email, password, firstName, lastName } = userData;

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.error("Error :", error);
  }
};

export const getLoggedInUser = async () => {
  try {
    console.log("Attempting to get logged-in user");
    const { account } = await createSessionClient();
    console.log("Session client created successfully");
    const user = await account.get();
    console.log("User data:", user);
    return parseStringify(user);
  } catch (error) {
    console.error("Error in getLoggedInUser:", error);
    return null;
  }
};

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();
    cookies().delete("appwrite-session");

    await account.deleteSession("current");
  } catch (error) {
    console.error("Error :", error);
  }
};
