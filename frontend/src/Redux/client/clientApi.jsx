import { apiSlice } from "../api/apiSlice";

export const clientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addClient: builder.mutation({
      query: (body) => ({
        url: "/api/client/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["client"],
    }),

    allClients: builder.query({
      query: (query) => ({
        url: "/api/client/all",
        params: query,
      }),
      providesTags: ["client"],
    }),

    singleClient: builder.query({
      query: (query) => ({
        url: `/api/client/${query?.id}`,
        params: query,
      }),
      providesTags: ["client"],
    }),

    deleteClient: builder.mutation({
      query: ({ id, role }) => ({
        url: `/api/client/delete/${id}?role=${role}`,
        method: "DELETE",
      }),
      invalidatesTags: ["client"],
    }),
  }),
});

export const {
  useAddClientMutation,
  useAllClientsQuery,
  useSingleClientQuery,
  useDeleteClientMutation,
} = clientApi;
