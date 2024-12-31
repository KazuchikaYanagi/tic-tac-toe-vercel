import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./features/Header";
import Footer from "./features/Footer";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Play from "./pages/Play";
import Rank from "./pages/Rank";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/#about" />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/play" element={<Play />} />
        <Route path="/ranking" element={<Rank />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
