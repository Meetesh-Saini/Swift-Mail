import "./css/Register.css";

import Spinner from "../assets/Spinner.svg";
import { RiArrowDownSFill } from "react-icons/ri";
import { BsExclamationCircleFill } from "react-icons/bs";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    username: undefined,
    password: undefined,
    confirmPassword: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState({
    password: true,
    confirm: true,
  });

  const navigate = useNavigate();

  // Sets document title
  // Checks if passwords are valid and match
  useEffect(() => {
    document.title = "Swift Mail — Sign up";

    if (password.length >= 8) {
      setErrors((prev) => {
        return { ...prev, password: undefined };
      });
    }

    if (confirmPassword.length >= 8 && password === confirmPassword) {
      setErrors((prev) => {
        return { ...prev, confirmPassword: undefined };
      });
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (username.length >= 4 && username.length <= 20) {
      setErrors((prev) => {
        return { ...prev, username: undefined };
      });
    }
  }, [username]);

  // Validates passwords
  const checkPasswords = () => {
    if (password.length < 8) {
      setErrors((prev) => {
        return {
          ...prev,
          password: "Password must contain atleast 8 characters",
        };
      });
      return false;
    }

    if (confirmPassword.length < 8) {
      setErrors((prev) => {
        return {
          ...prev,
          confirmPassword: "Password must contain atleast 8 characters",
        };
      });
      return false;
    }

    if (password !== confirmPassword) {
      setErrors((prev) => {
        return { ...prev, confirmPassword: "Passwords do not match" };
      });
      return false;
    }

    return true;
  };

  const handleRegister = () => {
   
    
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    navigate("/")

  };

  return (
    <div className="registerForm">
      <div className="navigation"></div>
      <div className="navigation"></div>
      <div className="navigation"></div>
      <div className="navigation"></div>
      <div className="navigation"></div>
      <div className="container">
        <div className="whipped-bug">
          <div className="header">
            <h2>Create your Account</h2>
            <span>to continue to Swift Mail</span>
          </div>
          <div className="tabstop-ebbs">
            <div className="spastics-foe">
              <span>Username</span>
              <input
                className={errors.username ? "error" : undefined}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="praised-yald">
                @swift.in
                <RiArrowDownSFill />
              </div>
              {errors.username ? (
                <div className="sanitise-oxen">
                  <BsExclamationCircleFill />
                  {errors.username}
                </div>
              ) : undefined}
            </div>
            <div className="spastics-foe">
              <span>Password</span>
              <input
                className={
                  passwordHidden.password && errors.password
                    ? "eastern-memo error"
                    : passwordHidden.password
                    ? "eastern-memo"
                    : undefined
                }
                type={passwordHidden.password ? "password" : "text"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="praised-yald">
                {passwordHidden.password ? (
                  <FaRegEye
                    onClick={() =>
                      setPasswordHidden((prev) => {
                        return { ...prev, password: false };
                      })
                    }
                  />
                ) : (
                  <FaRegEyeSlash
                    onClick={() =>
                      setPasswordHidden((prev) => {
                        return { ...prev, password: true };
                      })
                    }
                  />
                )}
              </div>
              {errors.password ? (
                <div className="sanitise-oxen">
                  <BsExclamationCircleFill />
                  {errors.password}
                </div>
              ) : undefined}
            </div>
            <div className="spastics-foe">
              <span>Repeat password</span>
              <input
                className={
                  passwordHidden.confirm && errors.confirmPassword
                    ? "eastern-memo error"
                    : passwordHidden.confirm
                    ? "eastern-memo"
                    : undefined
                }
                type={passwordHidden.confirm ? "password" : "text"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <div className="praised-yald">
                {passwordHidden.confirm ? (
                  <FaRegEye
                    onClick={() =>
                      setPasswordHidden((prev) => {
                        return { ...prev, confirm: false };
                      })
                    }
                  />
                ) : (
                  <FaRegEyeSlash
                    onClick={() =>
                      setPasswordHidden((prev) => {
                        return { ...prev, confirm: true };
                      })
                    }
                  />
                )}
              </div>
              {errors.confirmPassword ? (
                <div className="sanitise-oxen">
                  <BsExclamationCircleFill />
                  {errors.confirmPassword}
                </div>
              ) : undefined}
            </div>
          </div>
          <div className={loading ? "kittened-web spinner" : "kittened-web"}>
            <button onClick={() => handleRegister()}>
              {loading ? <img src={Spinner} alt="" /> : "Create account"}
            </button>
            <div>
              Already have an account?{" "}
              <span onClick={() => navigate("/account/sign-in")}>Sign in</span>
            </div>
          </div>
          <div className="domes-pout">
            <span>By creating a Account, you agree to our</span>
            <span>terms and conditions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
