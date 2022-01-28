import { Component } from '@angular/core';
import { Validators , FormBuilder , FormGroup  } from '@angular/forms';
import { StocksService } from './core/stocks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'stock-dashboard';
  stockForm : FormGroup ;
  submitted = false;
  constructor( private formBuilder: FormBuilder, private stocks : StocksService) {}
  ngOnInit() {
    this.stockForm = this.formBuilder.group({
      search : ["" ,Validators.required ],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.stockForm.invalid) {
      return ;
    }
    console.log(this.submitted);
    console.log(this.stockForm.value['search']);
    // console.table(this.registerForm);
    this.stocks.searchStock(this.stockForm.value['search']).subscribe(async ( formData ) => {
      console.log(formData);
      
      return await formData;
    });
  }
  
}
