import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../interface/user';
type loginF={
  parentId?:string;
  user:string;
  title:string;
  }
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  private url='http://localhost:3000/user/'
  login(user:User)
  {
    return this.http.post(this.url+'login',user)
  }

}
