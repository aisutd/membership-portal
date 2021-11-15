import { atom, selector } from "recoil";

export const subject = atom({
  key: "subject",
  default: {
    email: "",
    next_id: "",
    cognito_id: "",
    access_token: "",
  },
});
