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
  isDelete=signal<boolean>(false)
  id=signal<number>(0)
  productId:number=0
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
  deleteProduct() {
    console.log('test');

    this.productService.deleteProduct(this.productId).subscribe(
      (res) => {
        console.log(res);
        this.getAllProduct();
        this.isDelete.set(false)
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
  checkDelete(id:number)
  {
    this.isDelete.set(true)
    this.id.set(id)
    this.productId=id
  }
  cancelDelete()
  {
    this.isDelete.set(false)
    this.productId=0
  }
}
