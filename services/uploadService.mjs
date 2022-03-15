import { http } from "./http.mjs";

export const uploadPhrase = async (phrase = "") => {
  if (!phrase) return null;

  await http.post(`phrase`, { phrases: [phrase] });
};

export const uploadPhoto = async (photoUrl = "") => {
  if (!photoUrl) return null;

  await http.post(`meme/bot`, { photos: [photoUrl] });
};
