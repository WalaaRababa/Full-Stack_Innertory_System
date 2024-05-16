import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../services/transaction.service';
import Transaction from '../interface/tranaction';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-tranaction',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tranaction.component.html',
  styleUrl: './tranaction.component.css'
})
export class TransactionComponent implements OnInit {
  trans: any = {
    productId: 0,
    quantity: 0
  }
  constructor(private transaction: TransactionService) { }
  transactions = signal<Transaction[] | null>([])
  isError = signal<boolean>(false);
  messageError = signal<string>('');
  ngOnInit(): void {
    this.getAllTransaction()
  }
  getAllTransaction() {
    this.transaction.getAllTransactionProc().subscribe(res => {
      console.log(res);
      this.transactions.set(res)
    }, error => {
      console.log(error);

    }
    )
  }
  add() {
    console.log(this.trans);

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.transaction.CreateTransaction(this.trans,headers).subscribe(res => {
      console.log(res);
this.getAllTransaction()
      // this.transactions.set([res,...this.transactions()])
    }, error => {
      console.log(error);
      this.isError.set(true);
      this.messageError.set(error.error.message);
    }
    )
  }
  hideModal() {
    this.isError.set(false);
    this.messageError.set('');
  }
}
