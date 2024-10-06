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

    updateUser: builder.mutation({
      query: ({ id, data, role }) => ({
        url: `/api/user/update/${id}`,
        method: "PUT",
        body: data,
        params: { role },
      }),
      invalidatesTags: ["users"],
    }),

    deleteUser: builder.mutation({
      query: ({ id, role }) => ({
        url: `/api/user/delete/${id}`,
        method: "DELETE",
        params: { role },
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
