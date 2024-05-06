import { atomWithStorage } from "jotai/utils";

// export const subjectSelection = atom();
// export const chapterSelection = atom();
// export const questionData = atom();

export const user = atomWithStorage("userInfo");
export const order = atomWithStorage("order");
