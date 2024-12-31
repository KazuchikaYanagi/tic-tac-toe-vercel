import { NavLink } from "react-router-dom";
import Logo from "../components/Logo";

const Header = () => {
  return (
    <header className="fixed flex items-center justify-between w-screen px-5 md:px-10 top bg-stone-700 font-PIXELIFY">
      <NavLink to={"/"}>
        <Logo />
      </NavLink>

      <nav className="flex gap-5">
        <NavLink to="/#about" className="text-sm md:text-lg text-stone-300">
          About
        </NavLink>
        <NavLink to={"/ranking"} className="text-sm md:text-lg text-stone-300">
          Ranking
        </NavLink>
        <NavLink to={"/signIn"} className="text-sm md:text-lg text-stone-300">
          Login
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
