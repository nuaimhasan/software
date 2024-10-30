import { useSelector } from "react-redux";
import { useLoggedUserQuery } from "../Redux/user/authApi";

export function useAuthCheck(role) {
  const { isLoading: userQueryLoading } = useLoggedUserQuery({
    role,
  });

  const { loggedUser, userLoading } = useSelector((state) => state.user);

  const isLoading = userQueryLoading || userLoading;

  const isValidUser = loggedUser?.success && loggedUser?.data?.role == role;

  return { isLoading, isValidUser };
}
