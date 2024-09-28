import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./userSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/api/user/register",
        method: "POST",
        body: userInfo,
      }),
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
              })
            );
          }
        } catch (error) {
          // Do not any thing , handel error from ui
        }
      },
    }),

    // get logged user and dispatch to redux store
    loggedUser: builder.query({
      query: () => ({
        url: "/api/user/me",
        method: "GET",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result?.data?.success) {
            dispatch(
              userLoggedIn({
                data: result?.data,
                loading: false,
              })
            );
          } else {
            dispatch(
              userLoggedIn({
                data: undefined,
                loading: false,
              })
            );
          }
        } catch (error) {
          // Do not any thing , handel error from ui
        }
      },
    }),

    // logout and dispatch to redux store
    logout: builder.mutation({
      query: () => ({
        url: "/api/user/logout",
        method: "GET",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result?.data?.success) {
            dispatch(
              userLoggedIn({
                data: undefined,
              })
            );
          }
        } catch (error) {
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
