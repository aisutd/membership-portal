import { atom, selector } from "recoil";
import fetch_token from "recoil/actions/auth";
import fetch_profile from "recoil/actions/profile";

// stores email & sub from next-auth session
export const subject = atom({
  key: "subject",
  default: {
    email: "",
    next_id: "",
  },
});

// stores aws access token
export const cognito_state = selector({
  key: "cognito_id",
  get: async ({ get }) => {
    return await fetch_token(get(subject).next_id);
  },
});

// stores user profile
export const profile_state = selector({
  key: "profile",
  get: async ({ get }) => {
    const auth = get(cognito_state);
    return await fetch_profile(auth.provider_sub, auth.auth_token);
  }
})

// stores events
export const events = atom({
  key: "events",
  default: [],
});