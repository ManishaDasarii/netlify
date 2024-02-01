"use client";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
function Profile() {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.back()}>Back</Button>
      <h2>profile page</h2>
    </div>
  );
}
export default Profile;
