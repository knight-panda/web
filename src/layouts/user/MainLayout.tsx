import Navbar from "../../components/navbar/Navbar"
import Home from "../../pages/user/home/Home"
import { Outlet, useNavigate } from 'react-router-dom';

const MainLayout = () => {
  const navigate = useNavigate();

  const handleNavigation = (id: string) => {
    navigate(id);
  };
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default MainLayout
