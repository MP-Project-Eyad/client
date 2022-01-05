import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactCodeInput from "react-verification-code-input";
import axios from "axios";
import "./style.css";

const MySwal = withReactContent(Swal);
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Account = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [code, setCode] = useState("");

  const verifyAccount = async () => {
    if (code.length > 0) {
      try {
        const res = await axios.post(`${BASE_URL}/verify_account`, {
          id,
          code,
        });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your account has been verified",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      } catch (error) {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!, please try again.",
          confirmButtonColor: "black",
        });
      }
    }
  };

  return (
    <>
      <div className="verifyAccountWrapper">
        <div className="verifyAccountBox">
          <h1>Verify Your Account</h1>
          <ReactCodeInput fields={4} onComplete={(val) => setCode(val)} />
          <button onClick={verifyAccount}>Verify</button>
        </div>
      </div>
    </>
  );
};

export default Account;
