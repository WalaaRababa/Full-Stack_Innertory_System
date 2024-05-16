import { Component, OnInit } from '@angular/core';
import Product from '../interface/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
  constructor (private data:ProductService, private act :ActivatedRoute){}
  product={
    title:'',
    description:'',
    price:0,
    stockQuantity:0
  }
  id:string|null='';
  ngOnInit(): void {
    this.getProductById()
  }
getProductById()
{
this.id=(this.act.snapshot.paramMap.get('id'))
this.data.getProductById(this.id).subscribe(res=>
  {
this.product=res
  },error=>
    {
      console.log(error);
      
    }
)
}
updateProduct(event:Event)
{
event.preventDefault()
console.log(this.product);

const data=JSON.stringify(this.product)
console.log(data);

this.data.updateProduct(data,this.id).subscribe(res=>
  {
    console.log(res as any);
    
  },error=>
    {
      console.log(error);
      
    }
)

}
}
