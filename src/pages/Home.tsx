import Carousel from '../components/carousel/Carousel'
import Navbar from '../components/navbar/Navbar'
import AccountPage from './user/account/AccountPage'
import CartPage from './user/cartPage/CartPage'
import ProductDetailsPage from './user/products/ProductDetailsPage'
import Products from './user/products/Products'

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