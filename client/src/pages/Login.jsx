import "./css/Login.css";
import Logo from "../assets/Proton.png";
import GlobeIcon from "../assets/Globe.png";
import Spinner from "../assets/Spinner.svg";
import { RiArrowDownSFill } from "react-icons/ri";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsCheck2 } from "react-icons/bs";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { BsExclamationCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import api from "../config/backend";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const [errors, setErrors] = useState({
    email: undefined,
    password: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Swift Mail — Sign in";

    // const token = localStorage.getItem("token");

    // token ? navigate("/dashboard") : setRedirect(false);
  }, []);

  useEffect(() => {
    if (email.length >= 4 && email.length <= 20 && !email.includes('@')) {
      setErrors((prev) => {
        return { ...prev, username: undefined };
      });
    }

    setErrors((prev) => {
      return { ...prev, password: undefined };
    });
  }, [email, password]);

  const handleSignin = async () => {
    const storedUsername = localStorage.getItem("Email");
    const storedPassword = localStorage.getItem("password");
    if(email===storedUsername && storedPassword===password)
    {

       toast.success('Login successful');
       navigate("/dashboard");
    }
    else{
     toast.error("Invalid Email or Password");
    }

    
  };

  return redirect === false ? (
    <div className="loginForm">
      <div className="navigation"></div>
      <div className="navigation"></div>
      <div className="navigation"></div>
      <div className="navigation"></div>
      <div className="container">
        <div className="whipped-bug">
          <div className="header">
            <h2>Sign in</h2>
            <span>to continue to Swift Mail</span>
          </div>
          <div className="tabstop-ebbs">
            <div className="gumdrops-ace">
              <span>Email</span>
              <input
                className={errors.username ? "error" : undefined}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.username ? (
                <div className="reemploy-pion">
                  <BsExclamationCircleFill />
                  {errors.username}
                </div>
              ) : undefined}
            </div>
            <div className="gumdrops-ace">
              <span>Password</span>
              <input
                className={
                  passwordHidden && errors.confirmPassword
                    ? "mondays-gees error"
                    : passwordHidden
                    ? "mondays-gees"
                    : undefined
                }
                type={passwordHidden ? "password" : "text"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="praised-yald">
                {passwordHidden ? (
                  <FaRegEye onClick={() => setPasswordHidden(false)} />
                ) : (
                  <FaRegEyeSlash onClick={() => setPasswordHidden(true)} />
                )}
              </div>
              {errors.password ? (
                <div className="reemploy-pion">
                  <BsExclamationCircleFill />
                  {errors.password}
                </div>
              ) : undefined}
            </div>
          </div>
          
          <div className="kittened-web">
            <button onClick={() => handleSignin()}>
              {loading ? <img src={Spinner} alt="" /> : "Sign in"}
            </button>
            <div>
              New to Swift Mail?{" "}
              <span onClick={() => navigate("/account/sign-up")}>
                Create account
              </span>
            </div>
          </div>
          
        </div>
      </div>

    </div>
  ) : (
    // Loading spinner
    // Credits – https://loading.io
    <div className="_0vzh">
      <div className="clags-roe">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Login;
