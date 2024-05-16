import { RouterModule } from '@angular/router';
import { Component, OnInit, signal } from '@angular/core';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ProductService } from '../services/product.service';
import Product from '../interface/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private productService: ProductService) {}
  products = signal<Product[] | null>([]);
  title: string = '';
  ngOnInit(): void {
    this.getAllProduct();
  }
  getAllProduct() {
    this.productService.getAllProduct().subscribe(
      (res) => {
        console.log(res);
        this.products.set(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  search() {
    console.log(this.title);

    this.productService.searchProductByName(this.title).subscribe(
      (res) => {
        console.log(res);

        this.products.set(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  deleteProduct(id: number) {
    console.log('test');

    this.productService.deleteProduct(id).subscribe(
      (res) => {
        console.log(res);
        this.getAllProduct();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  sortAsc() {

    this.productService.sortAce().subscribe(
      (res) => {
        console.log(res);

        this.products.set(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  sortDec()
  {
    this.productService.sortDce().subscribe(
      (res) => {
        console.log(res);

        this.products.set(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
