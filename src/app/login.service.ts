import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit {

  public authHeader : any;
  constructor( private http : HttpClient) { }
  ngOnInit(): void {
      
  }
  signInUser( details ) {
    this.authHeader = this.http.post('http://localhost:3000/login', details );
    console.log(this.authHeader);
    return this.authHeader;
  }


}
