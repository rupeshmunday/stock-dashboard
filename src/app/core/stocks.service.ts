import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { TokenStorageService } from '../token-storage.service';


@Injectable ( {
  providedIn: 'root'
} )
export class StocksService {
  baseUrl = 'http://localhost:3000/api/stocks/';
  tokens : any;
  

  constructor ( private http: HttpClient , private token : TokenStorageService ) { }
  stoc ( ) {
    const token = 'Bearer '+this.token.getToken();
    this.tokens += token;
    const httpOptions = {
      headers: new HttpHeaders( { 'Authorization': this.tokens } )
    };
    return this.http.get( this.baseUrl , httpOptions ).pipe ( );
  }
  searchStock ( name: any ) {
    console.log ( this.token.getToken ( ) );
    return this.http.get ( this.baseUrl+'search/'+ name );
  }
  registerUser ( details : any) {
    this.tokens += this.token.getToken ( );
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.tokens })
    };
    return this.http.post('http://localhost:3000/register', details);
  }
  buyStock ( id , quantity ) {
    const b:string=this.token.getToken ( );
    this.tokens = 'Bearer '+b;
    const userid = this.token.getUser ( );
    console.log ( userid );
    console.log ( id );
    console.log( quantity['quantity'] );
    console.log( this.tokens );
    const httpOptions = {
      headers: new HttpHeaders ( { 'authorization': this.tokens } )
    };
    const stock_id=id;
    return this.http.post(this.baseUrl+'buy/'+userid+'/'+quantity['quantity'],stock_id, httpOptions);
  }
  sellStock ( id, quantity ) {
    const b:string=this.token.getToken ( );
    this.tokens = 'Bearer '+b;
    const userid = this.token.getUser ( );
    console.log ( userid );
    console.log ( id );
    console.log ( quantity['quantity'] );
    console.log ( this.tokens );
    const httpOptions = {
      headers: new HttpHeaders( { 'authorization': this.tokens } )
    };
    const stock_id = id;
    return this.http.put ( this.baseUrl+'sell/' + userid +'/'+  quantity['quantity'] , stock_id , httpOptions );
  }

  getStocks ( ) {
    const b:string=this.token.getToken ( );
    this.tokens = 'Bearer '+b;
    const httpOptions = {
      headers: new HttpHeaders( { 'authorization': this.tokens } )
    };
    const user_id = this.token.getUser ( );
    console.log(user_id);
    const data=this.http.post( this.baseUrl+'loggedIn/userInfo' , {user_id} , httpOptions );
    return data;
    
  }
  getStockPerformance( id:any ) {
    const b:string=this.token.getToken ( );
    this.tokens = 'Bearer '+b;
    const httpOptions = {
      headers: new HttpHeaders( { 'authorization': this.tokens } )
    };
    return this.http.get( this.baseUrl+id,httpOptions );
  }
  
  

  private handleErrorObservable(error: any) {
    console.error(error.message || error);
    return throwError(error);
  } 
}
