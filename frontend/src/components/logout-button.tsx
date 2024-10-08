import { LogOutIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

export default function LogoutButton() {
  const logout = async () => {
    const logoutResponse = await fetch("/api/authentication/logout", {
      method: "POST",
    });

    const logoutStatus = logoutResponse.status;

    if (logoutStatus === 200)
      return toast.success("Success", {
        description: "You have been logged out.",
        duration: 2000,
        onAutoClose: () => location.reload(),
      });
  };

  return (
    <Button onClick={() => logout()}>
      <LogOutIcon className="w-4 h-4 mr-2" />
      Logout
    </Button>
  );
}
