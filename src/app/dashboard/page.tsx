"use client";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { Select, MenuItem, Backdrop, CircularProgress } from "@mui/material";
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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [currentpage, setCurrentPage] = useState(1);

  const [totalpage, setTotalPage] = useState(10);
  const [paginationlimit, setPaginationLimit] = useState(20);
  const accessToken = useSelector(
    (state: any) => state.userLogin.userDetails.access_token
  );

  const [paginationDetails, setPaginationDetails] = useState<any>({});
  // console.log(accessToken);
  const getAllFarms = async (page: number | string, limit: number | string) => {
    setLoading(true);
    let options = {
      method: "GET",
      headers: new Headers({
        authorization: accessToken,
      }),
    };
    try {
      const varName = `${process.env.NEXT_PUBLIC_API_URL}`;
      const endpoint = `/farms/${page}/${limit}`;

      const result = `${varName}${endpoint}`;
      const response = await fetch(result, options);
      console.log(response);

      const responseData = await response.json();
      const { data, ...rest } = responseData;
      console.log(responseData);

      if (responseData.success) {
        setData(data);
        setPaginationDetails(rest);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOnPageChange = (_: any, value: number) => {
    console.log(value);
    getAllFarms(value, 20);
  };

  const handlePaginationMenuChange = (event: any) => {
    console.log(event.target.value);
    getAllFarms(1, event.target.value);
  };
  useEffect(() => {
    if (accessToken) {
      getAllFarms(1, 10);
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
        </Table>
      </TableContainer>

      <Select
        value={paginationDetails?.limit ? paginationDetails?.limit : 10}
        onChange={handlePaginationMenuChange}
        sx={{
          width: 50,
          height: 50,
        }}
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={15}>15</MenuItem>
        <MenuItem value={20}>20</MenuItem>
      </Select>

      <br></br>
      <Stack spacing={2}>
        {!loading ? (
          <Pagination
            count={paginationDetails?.total_pages}
            page={paginationDetails?.page}
            onChange={handleOnPageChange}
          />
        ) : (
          ""
        )}
      </Stack>
      <Backdrop open={loading}>
        <CircularProgress sx={{ color: "white" }} />
      </Backdrop>
    </div>
  );
}
