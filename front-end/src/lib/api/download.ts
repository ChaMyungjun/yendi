import client from "./client";

export const mp3 = (url: any) => client.get(`api/download/mp3?URL=${url}`);

export const mp4 = (url: any) => client.get(`api/download/mp4?URL=${url}`);
