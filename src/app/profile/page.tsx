"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { adduserDetails } from "../../../Redux/Modules/userlogin";
import { TextField } from "@mui/material";

function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const accessToken = useSelector(
    (state: any) => state.userLogin.userDetails.access_token
  );

  console.log(accessToken);
  const getProfile = async () => {
    setLoading(true);
    let options = {
      method: "GET",
      headers: new Headers({
        authorization: accessToken,
      }),
    };
    try {
      const varName = `${process.env.NEXT_PUBLIC_API_URL}`;
      const endpoint = "/users/profile";

      const result = `${varName}${endpoint}`;
      const response = await fetch(result, options);
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (accessToken) getProfile();
  }, [accessToken]);
  return (
    <div className="App">
      <h1>My profile</h1>
    </div>
  );
}
export default Profile;
