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
  data : any;
  content : any;
  public keyword : any;
  constructor( private formBuilder: FormBuilder, private stocks : StocksService) {}
  ngOnInit() {
    
  } 
  
}
