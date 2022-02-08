import { Component, OnInit } from '@angular/core';
import { Validators , FormBuilder , FormGroup  } from '@angular/forms';
import { LoginService } from '../login.service';
import { TokenStorageService } from '../token-storage.service';

@Component ( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
} )
export class LoginComponent implements OnInit {
  message = "message from login";
  loginForm : FormGroup ;
  submitted = false;
  isLoggedIn = false;
  id: any = 1;
  public authHeader : any;
  constructor ( private formBuilder: FormBuilder, private stocks : LoginService ,private token : TokenStorageService ) {}
  ngOnInit ( ) {
    this.loginForm = this.formBuilder.group({
      email : ["" ,[ Validators.required , Validators.email]],
      password : ["" , Validators.required],
    });
  }

  onSubmit() {
    if ( this.loginForm.invalid ) {
      return ;
    }
    console.log( this.loginForm.value );
    console.log ( this.loginForm );
    this.isLoggedIn = false;
    
    this.stocks.signInUser ( this.loginForm.value ).subscribe ( async ( formData ) => {
      alert ("Success sign in\n" );
      console.log ( formData );
      
      this.authHeader=formData[ 'accessToken' ];
      this.token.saveToken ( formData['accessToken'] );
      this.token.saveUser ( formData['data']['_id'] );
      console.log ( this.authHeader );
      console.log(formData['data']['_id']);
      
      this.isLoggedIn = true;
      
      
      return await formData;
    });
    this.submitted = true;
    
    
    
  }
}
