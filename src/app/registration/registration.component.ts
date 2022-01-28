import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { async } from 'rxjs';
import { StocksService } from '../core/stocks.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm : FormGroup;
  submitted = false;

  constructor( private formbuilder:FormBuilder, private stocks: StocksService) { }

  ngOnInit(){
    this.registerForm = this.formbuilder.group({
      name : ["" , Validators.required],
      // lastName : ["" , Validators.required],
      // mobNo : ["" , Validators.required],
      email : ["" ,[ Validators.required , Validators.email]],
      password : ["" , Validators.required],
    });
  }

  get h() {
    return this.registerForm.controls;
  }

  onSubmit () {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return ;
    }
    console.log(this.registerForm.value);
    // console.table(this.registerForm);
    this.stocks.registerUser(this.registerForm.value).subscribe(async ( formData ) => {
      alert("Success sign up\n" + JSON.stringify(this.registerForm.value))
      return await formData;
    });
  }
  OnReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
  

}
