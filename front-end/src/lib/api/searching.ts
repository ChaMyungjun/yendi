import client from "./client";

export const search = (title: any) => client.get(`api/search/${title}`);
