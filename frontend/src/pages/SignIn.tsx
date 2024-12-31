import { useState } from "react";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [frag, setFrag] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const loginForm = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setErrorMessage("");
    const formData = new FormData(e.currentTarget);
    const res = await fetch(
      `https://tic-tac-toe-vercel-backend.vercel.app/api/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: formData.get("username"),
          password: formData.get("password"),
        }),
        mode: "cors",
      }
    );
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      // return redirect("/play");
      navigate("/play");
    } else {
      setErrorMessage(data.message || "Failed to log in");
      console.error("Error:", data.message);
    }
  };

  const signUpForm = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setErrorMessage("");
    const formData = new FormData(e.currentTarget);

    const res = await fetch(
      `https://tic-tac-toe-vercel-backend.vercel.app/api/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: formData.get("username"),
          password: formData.get("password"),
        }),
      }
    );
    const data = await res.json();
    setErrorMessage(data.message);
    setFrag((prev) => !prev);
    console.log(data);
  };

  const fragHandle = () => {
    setFrag((prev) => !prev);
    setErrorMessage("");
  };

  return (
    <main className="h-screen pt-20 bg-stone-800">
      <section className="text-stone-200">
        <Form
          onSubmit={frag ? signUpForm : loginForm}
          frag={frag}
          errorMessage={errorMessage}
        />
        {errorMessage && (
          <div className="flex items-center mx-auto text-rose-600 w-[90%]">
            <span className="text-2xl font-MICRO">{errorMessage}</span>
          </div>
        )}

        <article className="pb-3 text-xl text-center md:text-3xl font-MICRO">
          {frag ? "Have an account?" : "Don't have any account?"}
          <span
            onClick={fragHandle}
            className="font-bold cursor-pointer hover:underline hover:text-red-300"
          >
            {frag ? (
              <span className="text-red-300 font-MICRO"> Log In</span>
            ) : (
              <span className="text-red-300 font-MICRO"> Sign Up</span>
            )}
          </span>
        </article>
      </section>
    </main>
  );
};

export default SignIn;
