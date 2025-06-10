
import { attemptRefresh } from "@/shared/api";
import { Button } from "@/shared/ui";
import { Link } from "react-router-dom";

export const HomePage = () => {
  async function  attempt(){
    await attemptRefresh()
  }
  return (
    <div>
      <Button onClick={attempt}>
        trigger
      </Button>
      <Link to="/login">Go to Login Page</Link>

      <h1>Welcome to the Home Page</h1>
      <p>This is the main landing page of the application.</p>
    </div>
  );
};
