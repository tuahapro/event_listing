import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b bg-white dark:bg-slate-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-[30px] font-black">
          EventHub
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/" className="text-[18px] font-bold hover:underline">
            Home
          </Link>
          <Link to="/events" className="text-[18px] font-bold hover:underline">
            Events
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
