import { apiSlice } from "./api/apiSlice";

export const asignProjectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAsignProject: builder.mutation({
      query: ({ data, role }) => ({
        url: "/api/project/asign/add",
        method: "POST",
        body: data,
        params: { role },
      }),
      invalidatesTags: ["project"],
    }),

    allAsignProject: builder.query({
      query: (query) => ({
        url: "/api/project/asign/all",
        params: query,
      }),
      providesTags: ["project"],
    }),

    singleAsignProject: builder.query({
      query: (query) => ({
        url: `/api/project/asign/${query?.id}`,
        params: query,
      }),
      providesTags: ["project"],
    }),

    deleteAsignProject: builder.mutation({
      query: ({ id, role }) => ({
        url: `/api/project/asign/delete/${id}?role=${role}`,
        method: "DELETE",
      }),
      invalidatesTags: ["project"],
    }),
  }),
});

export const {
  useAddAsignProjectMutation,
  useAllAsignProjectQuery,
  useSingleAsignProjectQuery,
  useDeleteAsignProjectMutation,
} = asignProjectApi;
