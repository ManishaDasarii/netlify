"use client";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { Select, MenuItem } from "@mui/material";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
export default function page() {
  const router = useRouter();

  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState("");
  const accessToken = useSelector(
    (state: any) => state.userLogin.userDetails.access_token
  );
  // console.log(accessToken);
  const GetFarms = async () => {
    let options = {
      method: "GET",
      headers: new Headers({
        authorization: accessToken,
      }),
    };
    try {
      const varName = `${process.env.NEXT_PUBLIC_API_URL}`;
      const endpoint = "/farms/1/20";

      const result = `${varName}${endpoint}`;
      console.log(result);

      const response = await fetch(result, options);
      console.log(response);

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
    if (accessToken) {
      GetFarms();
    }
  }, [accessToken]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">area</TableCell>
              <TableCell align="left">id&nbsp;(g)</TableCell>
              <TableCell align="left">location&nbsp;(g)</TableCell>
              <TableCell align="left">createdAt&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((val: any, key: any) => (
              <TableRow
                key={val?._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{val?.title}</TableCell>
                <TableCell align="left">{val?.area}</TableCell>
                <TableCell align="left">{val?.location_id?.title}</TableCell>
                <TableCell align="left">{val?.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <Select
            sx={{
              width: 50,
              height: 50,
            }}
          >
            <MenuItem value={1}>5</MenuItem>
            <MenuItem value={2}>10</MenuItem>
            <MenuItem value={3}>15</MenuItem>
            <MenuItem value={3}>20</MenuItem>
          </Select>
          <br></br>
          <Stack spacing={2}>
            <Pagination count={10} color="primary" />
          </Stack>
        </Table>
      </TableContainer>
    </div>
  );
}
