import { atomWithStorage } from "jotai/utils";

// export const subjectSelection = atom();
// export const chapterSelection = atom();
// export const questionData = atom();

export const user = atomWithStorage("userInfo");
export const order = atomWithStorage("order");
export const timer = atomWithStorage("timer");
export const services = atomWithStorage("services");
export const authUser = atomWithStorage("authUser");
export const cart = atomWithStorage("cart");
export const creatOrder = atomWithStorage("creatOrder");
