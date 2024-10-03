import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: (query) => ({
        url: "/api/user/all",
        params: query,
      }),
      providesTags: ["users"],
    }),

    editUserInfo: builder.mutation({
      query: ({ id, userInfo }) => ({
        url: `/user/update/info/${id}`,
        method: "PUT",
        body: userInfo,
      }),
      invalidatesTags: ["users"],
    }),

    editUserImage: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/user/updateImage/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useAllUsersQuery,
  useEditUserInfoMutation,
  useEditUserImageMutation,
} = userApi;
