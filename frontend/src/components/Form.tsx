interface FormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  frag: boolean;
  errorMessage: string;
}
const Form: React.FC<FormProps> = ({ onSubmit, frag, errorMessage }) => {
  return (
    <div className="px-8">
      <h2 className="py-8 text-3xl font-semibold md:text-5xl font-MICRO">
        {frag ? "Sign Up" : "Log In"}
      </h2>

      <form action="" className="w-full" onSubmit={onSubmit}>
        <label htmlFor="username" className="text-xl md:text-3xl font-MICRO">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          autoComplete="off"
          required
          className={`${
            errorMessage === "User not found" ? "border-rose-500" : ""
          } ${
            errorMessage === "The Username is already used"
              ? "border-rose-500"
              : ""
          } block w-[90%] border-2 bg-stone-700 border-none outline-none p-1 mb-8 font-PIXELIFY`}
        />
        <label htmlFor="password" className="text-xl md:text-3xl font-MICRO">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="off"
          required
          className={`${
            errorMessage === "Passwords do not match" ? "border-rose-500" : ""
          } block w-[90%] bg-stone-700 border-2 border-none outline-none p-1 mb-8 font-PIXELIFY`}
        />

        <button
          type="submit"
          className="p-1 px-2 text-lg bg-blue-700 md:p-2 md:px-4 md:text-2xl text-stone-200 font-MICRO"
        >
          {frag ? "Sign Up" : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default Form;
