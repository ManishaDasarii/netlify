"use client";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
function Home() {
  const router = useRouter();

  return (
    <div>
      <h2>home page</h2>
      <Button
        variant="contained"
        size="small"
        onClick={() => router.push("/profile")}
      >
        profile
      </Button>
      <Button variant="contained" size="small">
        Logout
      </Button>
      <br></br>
      <Button onClick={() => router.back()}>Back</Button>
    </div>
  );
}
export default Home;
