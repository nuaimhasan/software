import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useLogoutMutation } from "../Redux/user/authApi";

const useLogout = () => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = async (role) => {
    const res = await logout({ role });

    if (res?.data?.success) {
      toast.success("Logged out successfully");
      navigate("/");
    } else {
      toast.error("Failed to log out");
      console.log(res);
    }
  };

  return handleLogout;
};

export default useLogout;
