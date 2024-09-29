import { useSelector } from "react-redux";
import { useLoggedUserQuery } from "../Redux/user/authApi";

export function useAuthCheck(role) {
  const { data: user, isLoading: userQueryLoading } = useLoggedUserQuery({
    role,
  });
  const { loggedUser, userLoading } = useSelector((state) => state.user);

  const isLoading = userQueryLoading || userLoading;

  const isValidUser =
    loggedUser?.success && user?.success && user?.data?.role === role;

  return { isLoading, isValidUser };
}
