export interface CartItem {
    cartId: string;
    productId: string;
    productName: string;
    productImage: string;
    productPrice: number;
    discountPrice: number;
    quantity: number;
    totalPrice: number;
}