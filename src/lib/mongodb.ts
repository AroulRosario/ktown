import * as Realm from "realm-web";

export const APP_ID = "ktown-app-xxxxx"; // This should be the App ID from MongoDB Atlas App Services
// Since the user provided an API Key but not an App ID, I'll assume they might want to use it for authentication.
// Wait, the API Key provided: AQ.Ab8RN6KPVjl1lAvTRdfXJgD4odExHdggTgL_3d1T_bcrLrts7Q
// Usually, we need an App ID to initialize the Realm App.
// If I don't have the App ID, I'll create a placeholder and use an environment variable.

const app = typeof window !== "undefined" ? new Realm.App({ id: process.env.NEXT_PUBLIC_MONGODB_APP_ID || "ktown-app" }) : null;

export const getRealmApp = () => {
  if (!app) {
    throw new Error("Realm App can only be accessed on the client side");
  }
  return app;
};

export const loginWithApiKey = async () => {
  const realmApp = getRealmApp();
  const credentials = Realm.Credentials.apiKey(process.env.NEXT_PUBLIC_MONGODB_API_KEY || "AQ.Ab8RN6KPVjl1lAvTRdfXJgD4odExHdggTgL_3d1T_bcrLrts7Q");
  try {
    const user = await realmApp.logIn(credentials);
    return user;
  } catch (err) {
    console.error("Failed to log in", err);
    throw err;
  }
};
