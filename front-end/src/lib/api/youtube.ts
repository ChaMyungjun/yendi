import client from "./client";

export const search = (title: any) => client.get(`api/youtube/search/${title}`);

export const mp3 = (url: any) => client.get(`api/youtube/mp3?URL=${url}`);

export const mp4 = (url: any) => client.get(`api/youtube/mp4?URL=${url}`);
