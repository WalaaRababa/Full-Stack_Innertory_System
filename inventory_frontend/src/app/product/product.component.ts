import { Component, signal } from '@angular/core';
import Product from '../interface/product';
import { ProductService } from '../services/product.service';
import { FormsModule } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
constructor(private productService:ProductService ){}
product:any={
  title:'',
  description:'',
  price:0,
  stockQuantity:0
}

createNewProduct(event:Event)
{
  event.preventDefault()
 console.log(this.product);
 const headers = new HttpHeaders().set('Content-Type', 'application/json');
const data=JSON.stringify(this.product)
 this.productService.createProduct(data,headers)
      .subscribe(
        (result: any) => {
          // Log the result to the console
          console.log('Product created successfully:', result);
          // Optionally, reset product data or perform any other actions
          this.product = {}; // Reset product data after successful creation
        },
        (error: any) => {
          // Log error for debugging
          console.error('Error occurred:', error);
        }
      );
}

}
