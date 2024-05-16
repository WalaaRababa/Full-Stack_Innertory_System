import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formtransaction',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './formtransaction.component.html',
  styleUrl: './formtransaction.component.css'
})
export class FormtransactionComponent {
  onSubmit() {
  
}
}