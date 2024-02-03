"use client";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
export default function page() {
  const router = useRouter();
  return (
    <div>
      <Button
        variant="contained"
        size="small"
        onClick={() => router.push("/profile")}
      >
        Profile
      </Button>

      <Button
        variant="contained"
        size="small"
        onClick={() => router.push("/home")}
      >
        Logout
      </Button>
      <h1>default</h1>
    </div>
  );
}
