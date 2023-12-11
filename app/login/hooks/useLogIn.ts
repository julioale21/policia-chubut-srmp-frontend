import { useState } from "react";
import { useNavigate } from "../../common/hooks/useNavigate";
import { signIn } from "next-auth/react";

export const useLogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const responseNextAuth = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (responseNextAuth?.error) {
      console.log(responseNextAuth.error);
      return;
    }

    navigate("/dashboard");
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
  };
};
