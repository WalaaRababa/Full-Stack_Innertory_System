import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import User from '../interface/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
constructor(private authService:AuthService,private route:Router){}
user:User={
  email:'',
  password:''
}
isError:boolean=true;
messageError:string=''
login(event:Event)
{
  event.preventDefault()
  console.log(this.user);
  
  this.authService.login(this.user).subscribe((res)=>
  {
   const token=(res as any).access_token
   localStorage.setItem("token",token)
   this.route.navigate(['/home'])

  },error=>
  {
console.log(error.error.message);

  })
}
}
