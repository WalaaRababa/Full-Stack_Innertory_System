import { Component, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import User from '../interface/user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService, private route: Router) {}
  user: User = {
    email: '',
    password: '',
  };
  isError = signal<boolean>(false);
  messageError = signal<string>('');
  login(event: Event) {
    event.preventDefault();

    this.authService.login(this.user).subscribe(
      (res) => {
        const token = (res as any).access_token;
        localStorage.setItem('token', token);
        this.route.navigate(['/home']);
      },
      (error) => {
        console.log(error.error.message);
        this.isError.set(true);
        this.messageError.set(error.error.message);
      }
    );
  }
  hideModal() {
    this.isError.set(false);
    this.messageError.set('');
  }
}
