import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar"
import Home from "../../pages/user/home/Home"
import { Outlet, useNavigate } from 'react-router-dom';
import ScrollToTop from "../../utils/ScrollToTop";

const MainLayout = () => {
  const navigate = useNavigate();

  const handleNavigation = (id: string) => {
    navigate(id);
  };
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout
