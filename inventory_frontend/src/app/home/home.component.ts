import { Component, OnInit, signal } from '@angular/core';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ProductService } from '../services/product.service';
import Product from '../interface/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private productService: ProductService) { }
  products = signal<Product[] | null>([])
  ngOnInit(): void {
    this.getAllProduct()
  }
  getAllProduct() {
    this.productService.getAllProduct().subscribe(res => {
      console.log(res);

      this.products.set(res)
    }, error => {
      console.log(error);

    }
    )
  }
  search()
  {
    console.log("test");
    
  }
}
