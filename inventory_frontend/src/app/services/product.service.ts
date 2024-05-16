import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Product from '../interface/product';
type productDto= {
  title:string;
    description:string;
    price:number;
    stockQuantity:number;
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }
  private url='http://127.0.0.1:3000/product/'
  private token = localStorage.getItem('token')

  createProduct(product:productDto,headers:HttpHeaders)
  {

   return this.http.post(this.url,product,{headers})

  }
getAllProduct()
  {
    let headers = new HttpHeaders();
    if (this.token) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }
    const options = { headers: headers }; 
    
    return this.http.get<Product[]|null>(this.url,options)
  }
  searchProductByName(title:string)
  {
return this.http.post<Product[]|null>(this.url+`search/?title=${title}`,{})
  }
  getProductById(id:string|null)
  {
    return this.http.get<Product>(this.url+id)
  }
  updateProduct(product:productDto,id:string|null,headers:HttpHeaders)
  {
    return this.http.patch(this.url+id,product,{headers})
  }
  deleteProduct(id:number)
  {
    return this.http.delete(this.url+id)
  }
  sortAce()
  {
return this.http.post<Product[]|null>(this.url+`sortby-price-asc`,{})
  }
  sortDce()
  {
return this.http.post<Product[]|null>(this.url+`sortby-price-dec`,{})
  }
  productByPrice(min:number,max:number)
  {
return this.http.post<Product[]|null>(this.url+`by-range-price?min=${min}&max=${max}`,{})
  }
}
