"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useDispatch } from "react-redux";
import { adduserDetails } from "../../Redux/Modules/userlogin";

function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({ email: "", password: "" });
  const [msg, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    setErrors({});
    setMessage("");
    e.preventDefault();
    const submitData = { email, password };

    try {
      const varName = `${process.env.NEXT_PUBLIC_API_URL}`;
      const endpoint = "/users/signin";

      const result = `${varName}${endpoint}`;
      const res = await fetch(result, {
        method: "POST",
        body: JSON.stringify(submitData),
        headers: {
          "content-type": "application/json",
        },
      });

      const response = await res.json();
      if (response.status == 200) {
        dispatch(adduserDetails(response.data));
        router.push("/home");
        /* localStorage.setItem("user_data", JSON.stringify(response.data));*/
      } else if (response.status == 422) {
        setErrors(response.errors);
      } else if (response.status == 401) {
        setMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="email"
        value={email}
        variant="outlined"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      {<div>{errors.email}</div>}

      <br></br>
      <br></br>
      <TextField
        id="outlined-basic"
        label="password"
        value={password}
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>{errors.password}</div>
      <div>{msg}</div>

      <br></br>

      <Button variant="contained" size="small" onClick={handleSubmit}>
        submit
      </Button>
      <br></br>
    </div>
  );
}

export default Page;
