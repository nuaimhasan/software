import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: "include",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "X-XSRF-Token": Cookies.get("XSRF-TOKEN"),
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["users"],
});
