import { Login } from "./components/Login";
import { Title } from "./components/Title";

export default function Page() {
  return (
    <>
      <Title>Login</Title>
      <div className="w-full h-full justify-center align-middle">
        <Login />
      </div>
    </>
  );
}
