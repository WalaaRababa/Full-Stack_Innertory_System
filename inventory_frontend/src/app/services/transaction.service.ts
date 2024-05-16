import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Transaction from '../interface/tranaction';
type transactionDto={
  productId:number;
  quantity:number
}
@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }
  private url='http://localhost:3000/transaction'
  private token = localStorage.getItem('token')

  CreateTransaction(transaction:transactionDto|string)
  {
    const headers=new HttpHeaders({ 'Authorization': `Bearer ${this.token}`})
return this.http.post(this.url,transaction,{headers})    
  }
getAllTransactionProc()
  {
    return this.http.get<Transaction[]|null>(this.url)
  }
}
