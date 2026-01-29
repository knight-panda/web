import Carousel from '../components/carousel/Carousel'
import Navbar from '../components/navbar/Navbar'
import AccountPage from './account/AccountPage'
import CartPage from './cartPage/CartPage'
import ProductDetailsPage from './products/ProductDetailsPage'
import Products from './products/Products'

const Home = () => {
    return (
        <div>
            <Navbar />
            <AccountPage />
            <CartPage />
            <ProductDetailsPage/>
            <Carousel />
            <Products />
        </div>
    )
}

export default Home