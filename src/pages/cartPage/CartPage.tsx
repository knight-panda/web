import CartItems from "../../components/cart/CartItems";
import CartSummary from "../../components/cart/CartSummary";
import "./CartPage.css";

const CartPage = () => {

    const handleAddEditAddress = () => {
        console.log("Add / Edit Address clicked");
        // later: open modal / bottom sheet
    };

    return (
        <div className="cart-page">
            <div className="cart-container">
                <CartItems />
                <CartSummary addEditAddress={handleAddEditAddress}/>
            </div>
        </div>
    );
};

export default CartPage;