import { apiSlice } from "../api/apiSlice";

export const clientPaymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addClientPayment: builder.mutation({
      query: ({ data, role }) => ({
        url: `/api/client/payment/add?role=${role}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["clientPayment", "client"],
    }),

    allClientPayment: builder.query({
      query: (query) => ({
        url: `/api/client/payment/all?role=${query?.role}`,
        params: query,
      }),
      providesTags: ["clientPayment", "client"],
    }),
  }),
});

export const { useAddClientPaymentMutation, useAllClientPaymentQuery } =
  clientPaymentApi;
