import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  
  // private url='https://full-stack-innertory-system.onrender.com/user/'
    private url='http://localhost:3000/user/'
    
  login(user:User)
  {
    return this.http.post(this.url+'login',user)
  }
isLoggedIn()
{
const token=localStorage.getItem('token')
if(token)
  {
    return true
  }
  else{
    return false
  }
}

}
