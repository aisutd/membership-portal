import { atom, selector } from "recoil";
import fetch_token from "recoil/actions/auth";

export const subject = atom({
  key: "subject",
  default: {
    email: "",
    next_id: "",
    cognito_id: "",
    access_token: "",
  },
});

export const cognito_state = selector({
  key: "cognito_id",
  get: async ({ get }) => {
    return await fetch_token(get(subject).next_id);
  },
});
