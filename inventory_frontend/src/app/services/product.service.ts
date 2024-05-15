import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Product from '../interface/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }
  private url='http://localhost:3000/product/'
  private token = localStorage.getItem('token')

  createProduct()
  {
    
  }
getAllProduct()
  {
    const headers=new HttpHeaders({ 'Authorization': `Bearer ${this.token}`})
    return this.http.get<Product[]|null>(this.url,{headers})
  }
}
