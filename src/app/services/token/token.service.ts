import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  // method to save the token
  set token(token: string){
    localStorage.setItem('token', token);
  }

  // method to get the token
  get token() {
    return localStorage.getItem('token') as string;
  }

  isTokenNotValid(){
    return !this.isTokenValid();
  }

  isTokenValid(){
    const token = this.token;
    if(!token) { //if no token exists
      return false;
    }

    //decode the token
    const jwtHelper = new JwtHelperService();
    const tokenExpired = jwtHelper.isTokenExpired(token);

    if(tokenExpired) {
      // if token expired clear the cache
      localStorage.clear();
      return false;
    }

    return true;
  }
}
