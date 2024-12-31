const Footer = () => {
  return (
    <footer className="bottom-0 py-1 text-center md:py-2 bg-stone-700 text-stone-200 font-PIXELIFY">
      <span className="text-sm md:text-lg font-MICRO">&copy;</span>
      {new Date().getFullYear()} TIC-TAC-TOE | All Rights reserved.
    </footer>
  );
};

export default Footer;
