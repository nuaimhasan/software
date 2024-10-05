import { apiSlice } from "./api/apiSlice";

export const develoeprProjectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addDeveloperProject: builder.mutation({
      query: ({ data, role }) => ({
        url: "/api/project/developer/add",
        method: "POST",
        body: data,
        params: { role },
      }),
      invalidatesTags: ["developerProject"],
    }),

    allDeveloperProject: builder.query({
      query: (query) => ({
        url: "/api/project/developer/all",
        params: query,
      }),
      providesTags: ["developerProject"],
    }),

    singleDeveloperProject: builder.query({
      query: (query) => ({
        url: `/api/project/developer/${query?.id}`,
        params: query,
      }),
      providesTags: ["developerProject"],
    }),

    deleteDeveloperProject: builder.mutation({
      query: ({ id, role }) => ({
        url: `/api/project/developer/delete/${id}?role=${role}`,
        method: "DELETE",
      }),
      invalidatesTags: ["developerProject"],
    }),

    updateDeveloperProject: builder.mutation({
      query: ({ id, data, role }) => ({
        url: `/api/project/developer/update/${id}?role=${role}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["developerProject"],
    }),
  }),
});

export const {
  useAddDeveloperProjectMutation,
  useAllDeveloperProjectQuery,
  useSingleDeveloperProjectQuery,
  useDeleteDeveloperProjectMutation,
  useUpdateDeveloperProjectMutation,
} = develoeprProjectApi;
