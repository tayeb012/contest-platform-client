import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAuth from "../../Hooks/UseAuth";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Login = () => {
  const { user, signIn, signInGoogle } = useAuth();
  const [disable, setDisable] = useState(true);
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleValidCaptcha = (e) => {
    e.preventDefault();
    const captchaValue = e.target.value;
    if (validateCaptcha(captchaValue, false) == true) {
      return setDisable(false);
    } else {
      return setDisable(true);
    }
  };

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        const name = result._tokenResponse.displayName;
        const email = result._tokenResponse.email;
        const photoUrl = result._tokenResponse.photoUrl;
        navigate(location?.state ? location.state : "/");
        const userData = { name, email, photoUrl, role: "NORMAL_USER" };
        console.log(result._tokenResponse, userData);
        axiosPublic
          .post(`/usersInsert`, userData)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });

        return Swal.fire({
          position: "center",
          icon: "success",
          title: "Google Login Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        console.log(email, errorMessage);
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${errorMessage}`,
        });
        // ...
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("Login submit", email, password);

    signIn(email, password)
      .then((userCredential) => {
        // nuper61314@gmail.com A456*789a
        // Signed in
        const userLogin = userCredential.user;
        const user = { email };
        console.log("Login is successfully", userLogin);
        navigate(location?.state ? location.state : "/");
        // get access token
        // axiosSecure
        //   .post(url, user, {
        //     withCredentials: true,
        //   })
        //   .then((result) => {
        //     console.log(result.data);
        //   })
        //   .catch((error) => console.log(error));
        return Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        // ...
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "User not found",
        });
      });
  };

  return (
    <div className="flex justify-center items-center  py-12">
      <Helmet>
        <title>Sign in - ContestCraft</title>
      </Helmet>
      <div className="md:w-3/4 lg:w-1/2  mx-auto text-gray-300 glass bg-opacity-5 backdrop-blur-sm transition-colors bg-base-100 rounded-md py-8">
        <h1 className="text-4xl text-yellow-400 font-semibold text-center">
          Login your account
        </h1>
        <form onSubmit={handleLogin} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <LoadCanvasTemplate />
            </label>
            <input
              onChange={handleValidCaptcha}
              type="text"
              name="captcha"
              placeholder="Type the Captcha"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button disabled={disable} className="btn bg-purple-300">
              Login
            </button>
          </div>
        </form>
        <div className="form-control place-items-center">
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
          >
            <svg
              className="w-4 h-4 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 19"
            >
              <path
                fillRule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clipRule="evenodd"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
        <p className="text-[#706F6F] text-center">
          Don't Have An Account ?
          <Link to="/register" className="font-bold text-[#F75B5F]">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
