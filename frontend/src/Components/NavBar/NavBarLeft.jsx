import Logo from "../../assets/logo.webp";
import { Link } from "react-router-dom";

const NavBarLeft = () => {
  return (
    <Link to={"/"} className="w-[85px]">
      <img src={Logo} alt="logo" className="w-full h-full object-cover" />
    </Link>
  );
};

export default NavBarLeft;
