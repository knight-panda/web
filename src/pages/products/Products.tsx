import ProductCard from "../../components/ProductCard/ProductCard"
import type { Product } from "../../models/Product"
import "./Products.css"

const products: Product[] = [
  {
    id: 1,
    title: "Campus Running Shoes",
    price: 1299,
    mrp: 2499,
    stock: 10,
    image:
      "https://rukminim2.flixcart.com/image/416/416/xif0q/shoe/6/9/9/8-brd-406-campus-original-imagk9f7k9gzfmyb.jpeg"
  },
  {
    id: 2,
    title: "Noise Smart Watch",
    price: 1999,
    mrp: 3999,
    stock: 8,
    image:
      "https://rukminim2.flixcart.com/image/416/416/xif0q/smartwatch/l/z/n/-original-imagp6kx9z3zdhmy.jpeg"
  },
  {
    id: 3,
    title: "Boat Wireless Headphones",
    price: 1499,
    mrp: 2999,
    stock: 15,
    image:
      "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/j/d/2/-original-imaghhrysf6pzszp.jpeg"
  },
  {
    id: 4,
    title: "Puma Casual T-Shirt",
    price: 799,
    mrp: 1599,
    stock: 20,
    image:
      "https://rukminim2.flixcart.com/image/416/416/xif0q/t-shirt/y/o/q/m-original-imagkzcgxhhkzm8g.jpeg"
  },
  {
    id: 3,
    title: "Boat Wireless Headphones",
    price: 1499,
    mrp: 2999,
    stock: 15,
    image:
      "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/j/d/2/-original-imaghhrysf6pzszp.jpeg"
  },
  {
    id: 4,
    title: "Puma Casual T-Shirt",
    price: 799,
    mrp: 1599,
    stock: 20,
    image:
      "https://rukminim2.flixcart.com/image/416/416/xif0q/t-shirt/y/o/q/m-original-imagkzcgxhhkzm8g.jpeg"
  }
]

const Products = () => {
  return (
    <div className="products-grid">
      {products.map((item) => (
        <ProductCard />
      ))}
    </div>
  )
}

export default Products
