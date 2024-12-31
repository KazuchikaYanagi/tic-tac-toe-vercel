interface Props {
  children: React.ReactNode;
}

const Button = ({ children }: Props) => {
  return (
    <button className="p-1 px-4 text-xl transition-all duration-300 bg-green-600 md:p-2 md:px-8 md:text-3xl font-MICRO text-slate-200 hover:bg-green-700">
      {children}
    </button>
  );
};

export default Button;
