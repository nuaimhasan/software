import "../../../assets/css/login.css";
import { useState } from "react";
import { CgLogIn } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLoginMutation } from "../../../Redux/user/authApi";

export default function Login() {
  const { role } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    const data = {
      email,
      password,
      role,
    };

    const res = await login(data);

    if (res?.data?.success) {
      const loggedRole = res?.data?.data?.role;

      if (loggedRole == role) {
        navigate(`/${role}/dashboard`);
        setError("");
      } else {
        setError("You are not authorized to login as " + role);
      }
    } else {
      console.log(res);
      setError(res?.data?.message);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="container">
        <div className="relative mx-auto w-full sm:w-[410px]">
          <div className="login_box">
            <div className="login_icon shadow-lg">
              <CgLogIn className="text-[42px]" />
            </div>

            <h2 className="my-2 text-center text-[25px] text-base-100">
              Sign In
            </h2>

            <form onSubmit={handleLogin} className="mt-4 text-[15px] sm:px-4">
              <div className="relative">
                <div className="absolute left-2 top-[19px] text-primary">
                  <MdEmail />
                </div>
                <input type="email" name="email" placeholder="Email" />
              </div>

              <div className="relative mt-4">
                <div className="absolute left-2 top-[19px] text-primary">
                  <FaLock />
                </div>
                <input type="password" name="password" placeholder="Password" />
              </div>

              {error && (
                <div className="mt-2 text-xs text-red-500">{error}</div>
              )}

              <div className="mt-3 flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-neutral-content duration-300 hover:text-primary"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="mt-3">
                <button
                  disabled={isLoading && true}
                  className="w-full rounded bg-primary py-3 text-center text-base-100"
                >
                  {isLoading ? "Loading..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
