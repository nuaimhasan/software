import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./userSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ data, role }) => ({
        url: "/api/user/add",
        method: "POST",
        body: data,
        params: { role },
      }),

      invalidatesTags: ["users"],
    }),

    login: builder.mutation({
      query: (loginInfo) => ({
        url: "/api/user/login",
        method: "POST",
        body: loginInfo,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result?.data?.success) {
            dispatch(
              userLoggedIn({
                data: result?.data,
                userLoading: false,
              }),
            );
          }
        } catch (error) {
          // Do not any thing , handel error from ui
          console.log(error);
        }
      },
    }),

    // get logged user and dispatch to redux store
    loggedUser: builder.query({
      query: ({ role }) => ({
        url: "/api/user/me",
        method: "GET",
        params: { role },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result?.data?.success) {
            dispatch(
              userLoggedIn({
                data: result?.data,
                loading: false,
              }),
            );
          } else {
            dispatch(
              userLoggedIn({
                data: undefined,
                loading: false,
              }),
            );
          }
        } catch (error) {
          // Do not any thing , handel error from ui
          console.log(error);
        }
      },
    }),

    // logout and dispatch to redux store
    logout: builder.mutation({
      query: ({ role }) => ({
        url: "/api/user/logout",
        method: "GET",
        params: { role },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result?.data?.success) {
            dispatch(
              userLoggedIn({
                data: undefined,
                loading: false,
              }),
            );
          }
        } catch (error) {
          console.log(error);
          // Do not any thing , handel error from ui
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLoggedUserQuery,
  useLogoutMutation,
} = authApi;
