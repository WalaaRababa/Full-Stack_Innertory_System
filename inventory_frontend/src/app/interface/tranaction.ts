import Product from "./product";

export default interface Transaction{
    id?: number;
    quantity:number;
    productId:Product;
    timestamp?:number;
}