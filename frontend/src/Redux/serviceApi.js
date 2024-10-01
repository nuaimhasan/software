import { apiSlice } from "./api/apiSlice";

export const serviceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addservice: builder.mutation({
      query: ({ data, role }) => ({
        url: `/api/service/add?role=${role}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["service"],
    }),

    allServices: builder.query({
      query: (query) => ({
        url: "/api/service/all",
        params: query,
      }),
      providesTags: ["service"],
    }),

    singleService: builder.query({
      query: (query) => ({
        url: `/api/service/${query?.id}`,
        params: query,
      }),
      providesTags: ["service"],
    }),

    updateService: builder.mutation({
      query: ({ id, data, role }) => ({
        url: `/api/service/update/${id}?role=${role}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["service"],
    }),

    deleteService: builder.mutation({
      query: ({ id, role }) => ({
        url: `/api/service/delete/${id}?role=${role}`,
        method: "DELETE",
      }),
      invalidatesTags: ["service"],
    }),
  }),
});

export const {
  useAddserviceMutation,
  useAllServicesQuery,
  useSingleServiceQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
