import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm : FormGroup;
  submitted = false;

  constructor( private formbuilder:FormBuilder) { }

  ngOnInit(){
    this.registerForm = this.formbuilder.group({
      firstName : ["" , Validators.required],
      lastName : ["" , Validators.required],
      mobNo : ["" , Validators.required],
      email : ["" ,[ Validators.required , Validators.email]],
      password : ["" , Validators.required],
      acceptAndC : [false , Validators.required]
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
    console.table(this.registerForm.value);
    console.table(this.registerForm);
    alert("Success sign up\n" + JSON.stringify(this.registerForm.value))
  }
  OnReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
  

}
