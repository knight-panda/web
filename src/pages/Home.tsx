import Carousel from '../components/carousel/Carousel'
import Navbar from '../components/navbar/Navbar'
import Products from './products/Products'

const Home = () => {
    return (
        <div>
            <Navbar />
            <Carousel />
            <Products />
        </div>
    )
}

export default Home