import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../services/transaction.service';
import Transaction from '../interface/tranaction';

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
    const data=JSON.stringify(this.trans)
    console.log(data);
    
    this.transaction.CreateTransaction(data
     ).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);

    }
    )
  }
}
