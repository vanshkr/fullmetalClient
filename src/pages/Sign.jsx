import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogInMutation, useRegisterMutation } from "../redux/services/backendApi";
import jwt_decode from 'jwt-decode';



const initialState = { fullName: '', email: '', password: '', confirmPassword: '' };

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const [signUpClicked, setSignUpClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [postLogInfo] = useLogInMutation();
  const [postRegInfo] = useRegisterMutation();
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  console.log(clientId)

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleGoogleLogin
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"), {
      theme: "outline", size: "large", shape: "pill"
    }


    );
    google.accounts.id.prompt();
  }, [])

  const navigate = useNavigate();
  const handleClose = () => {
    setIsOpen(false);
    navigate(-1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (signUpClicked) {
      postRegInfo(formData);
    }
    else {
      postLogInfo(formData);
    }
    
  }

  const switchMode = () => {
    setFormData(initialState);
    setSignUpClicked((prevIsSignup) => !prevIsSignup);
    
  };
  const handleGoogleLogin = (response) => {
    // Handle the Google login response here
    console.log("Google login successful:", response);
    console.log(response);
    const userObject = jwt_decode(response.credential);
    console.log(userObject,"userObject");
    
  };
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <div className='relative flex flex-col justify-center min-h-screen overflow-hidden'>
      <div
        className={`w-full p-6 m-auto bg-metalise rounded-md shadow-md md:max-w-md ${isOpen ? "" : "hidden"
          }`}
      >
        <h1 className='text-3xl font-semibold text-center text-drySeedlings '>
          {signUpClicked ? "Create an Account" : "Log In"}
        </h1>
        <button
          className='relative -top-10  text-white hover:text-gray-300'
          onClick={handleClose}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
        <form className='mt-6' onSubmit={handleSubmit}>
          {signUpClicked ? (
            <div className='mb-2'  >
              <label
                for='full-name'
                className='block text-sm font-semibold text-white'
              >
                Full Name
              </label>
              <input
                name="fullName"
                type='text'
                onChange={handleChange}
                className='block w-full px-4 py-2 mt-2 text-drySeedlings bg-metalise border rounded-md focus:border-chineseGreen focus:ring-greenDynasty focus:outline-none focus:ring focus:ring-opacity-40'
              />
            </div>
          ) : null}
          <div className='mb-2'>
            <label
              for='email'
              className='block text-sm font-semibold text-white'
            >
              Email
            </label>
            <input
              onChange={handleChange}
              name='email'
              type='email'
              className='block w-full px-4 py-2 mt-2 text-drySeedlings bg-metalise border rounded-md focus:border-chineseGreen focus:ring-greenDynasty focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </div>
          <div className='mb-2'>
            <label
              for='password'
              className='block text-sm font-semibold text-white'
            >
              Password
            </label>
            <input
              onChange={handleChange}
              name="password"
              type='password'
              className='block w-full px-4 py-2 mt-2 text-drySeedlings bg-metalise border rounded-md focus:border-chineseGreen focus:ring-greenDynasty focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </div>
          {signUpClicked ? (
            <div className='mb-2'>
              <label
                for='confirm-password'
                className='block text-sm font-semibold text-white'
              >
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type='password'
                onChange={handleChange}
                className='block w-full px-4 py-2 mt-2 text-drySeedlings bg-metalise border rounded-md focus:border-chineseGreen focus:ring-greenDynasty focus:outline-none focus:ring focus:ring-opacity-40'
              />
            </div>
          ) : null}
          <a href='#' className='text-xs text-chineseGreen hover:underline'>
            Forget Password?
          </a>
          <div className='mt-6'>
            <button className='w-full font-bold px-4 py-2 tracking-wide text-metalise transition-colors duration-200 transform bg-drySeedlings rounded-md hover:bg-chineseGreen focus:outline-none focus:bg-chineseGreen'>
              {signUpClicked ? "Register" : "Log In"}
            </button>
          </div>
        </form>
        <div className='relative flex items-center justify-center w-full mt-6 border border-t'>
          <div className='absolute px-5 bg-white'>Or</div>
        </div>
        <div className='flex mt-4 gap-x-2'>
          <button
            id='signInDiv'
            onClick={handleGoogleLogin}
            type='button'
            className='flex  items-center justify-center w-full '

          >

          </button>
        </div>



        <p className='mt-8 text-xs font-light text-center text-white '>
          {" "}
          {!signUpClicked ? `Don't have an account?` : `Have an account?`}
          <div
            className='font-medium text-chineseGreen hover:underline inline-block cursor-pointer pl-2'
            onClick={() => switchMode()}
          >
            {!signUpClicked ? "Register" : "Log In"}
          </div>
        </p>
      </div>
    </div>
  );
};
export default Login;
