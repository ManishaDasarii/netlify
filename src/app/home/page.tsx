"use client";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
function Home() {
  const router = useRouter();

  return (
    <div>
      <h2>home</h2>
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

      <Button onClick={() => router.back()}>Back</Button>
    </div>
  );
}
export default Home;
