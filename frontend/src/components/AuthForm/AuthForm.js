import React, { useState } from "react";
import { createUser } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const AuthForm = () => {
  const [authData, setAuthData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const navigate = useNavigate();
 const {setUser} =useAuth()


  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(true);
  console.log("isRegistering", isRegistering);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthData({
      ...authData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let endpoint = "auth/create-user"; // Default endpoint
      if (!isRegistering) {
        endpoint = "auth/login-user"; // If registering, change endpoint
      }

      const res = await createUser(endpoint, authData);
      if (res && res.data && res.data.success && !isRegistering) {
        setIsLoading(false);
        setIsRegistering(false);
        navigate("/");
        setUser({user:res.data.user})
        localStorage.setItem("userDetails",JSON.stringify({user:res.data.user, token:res.data.token}))
      } else {
        setIsLoading(false);
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log(error, "Something went wrong");
      setIsLoading(false);
    }
  };



  return (
    <div className="w-[400px] min-h-[400px]">
      <form
        onSubmit={handleSubmit}
        className="border-[2px] rounded-[10px] p-[20px] flex justify-center items-center flex-col gap-[20px] h-[100%] w-[100%] border-[#c5c4c4ec] "
      >
        <div className=" h-[40px]  rounded-md overflow-hidden w-[100%]">
          <input
            type="email"
            placeholder="Enter your email..."
            name="email"
            value={authData.email}
            onChange={handleChange}
            className="w-[100%] h-[100%] rounded-md border-none outline-none px-[10px]"
          />
        </div>
        {isRegistering && (
          <div className=" h-[40px]  rounded-md overflow-hidden w-[100%]">
            <input
              type="text"
              name="name"
              value={authData.name}
              onChange={handleChange}
              placeholder="Enter your name..."
              className="w-[100%] h-[100%] rounded-md border-none outline-none px-[10px]"
            />
          </div>
        )}

        <div className=" h-[40px]  rounded-md overflow-hidden w-[100%]">
          <input
            type="password"
            name="password"
            value={authData.password}
            onChange={handleChange}
            placeholder="Enter your password ..."
            className="w-[100%] h-[100%] rounded-md border-none outline-none px-[10px]"
          />
        </div>
        <div className=" h-[40px]  rounded-md overflow-hidden w-[100%]">
          <button
            type="submit"
            className="bg-blue-300 w-[100%] font-[600] text-[#000] py-2"
          >
            {isLoading ? "...Submit" : "Submit"}
          </button>
        </div>

        <span
          onClick={() => setIsRegistering(!isRegistering)}
          className="cursor-pointer"
        >
          {" "}
          {isRegistering
            ? "already have account? click to login"
            : "Create account"}{" "}
        </span>
      </form>
    </div>
  );
};

export default AuthForm;
