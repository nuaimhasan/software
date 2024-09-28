import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../Redux/user/userSlice";

export const useCheckAuth = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      fetch("/api/user/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setUser(data);
            dispatch(
              userLoggedIn({
                data: data,
                loading: false,
              })
            );
          }
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return user;
};
