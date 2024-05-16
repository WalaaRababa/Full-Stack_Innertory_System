import { Component, signal } from '@angular/core';
import Product from '../interface/product';
import { ProductService } from '../services/product.service';
import { FormsModule } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule,CommonModule],
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
message=signal<boolean>(false)

createNewProduct(event:Event)
{
  event.preventDefault()
 console.log(this.product);
 const headers = new HttpHeaders().set('Content-Type', 'application/json');
 this.productService.createProduct(this.product,headers)
      .subscribe(
        (result: any) => {
          console.log('Product created successfully:', result);
          this.message.set(true)
        },
        (error: any) => {
          console.error('Error occurred:', error);
        }
      );
}
hidePopup()
{
  this.message.set(false)
this.product={}
}
}
