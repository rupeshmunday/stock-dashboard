import { Component, OnInit } from '@angular/core';
import { Validators , FormBuilder , FormGroup  } from '@angular/forms';
import { StocksService } from '../core/stocks.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  stockForm : FormGroup ;
  submitted = false;
  data : any;
  content : any;
  keyword : any;
  app : AppComponent;
  stockData : any;
  submittedStock : any;
  constructor( private formBuilder: FormBuilder, private stocks : StocksService , private route: ActivatedRoute ) {}
  ngOnInit():void {
    this.stockForm = this.formBuilder.group({
      search : ["" , Validators.required ],
    });
  }
  onSubmit() {
    this.submitted=true;
    if (this.stockForm.invalid) {
      return ;
    }
    console.log(this.submitted);
    // console.log(this.stockForm.value['search']);
    this.keyword = this.stockForm.value['search'];
    // console.log("keyword   ", this.keyword);
    

    // console.table(this.registerForm);
    // this.stocks.searchStock(this.keyword).subscribe(async ( formData ) => {
    //   // console.log(formData['data']);
    //   // console.log(formData['bestMatches']);
      
    //   this.data = formData['bestMatches'];
    //   if(this.data[0]=== undefined ) {
    //     console.log("Content not found");
    //     this.content = true;
    //   }
    //   else{
    //     this.content = false;
    //   }
      
    //   return await formData;
    // });
    console.log(this.keyword);
    
    
    // console.table(this.registerForm);
    this.stocks.searchStock(this.keyword).subscribe(async ( formData ) => {
      // console.log(formData['data']);
      console.log(formData['bestMatches']);
      
      this.data = formData['bestMatches'];
      if(this.data[0]=== undefined ) {
        console.log("Content not found");
        this.content = true;
      }
      else{
        this.content = false;
        this.submitted = true;
      }
    return await formData;
    });
}

  getStockPerformance(symbol:any){
    let currentDate = new Date();
    let yesterdayDate ;
    console.log("The current date="+currentDate.getDay());
    if(currentDate.getDay()==1){
      yesterdayDate = currentDate.setDate(currentDate.getDate()- 3);
    }
    else if ( currentDate.getDay()==0 ) {
      yesterdayDate = currentDate.setDate(currentDate.getDate()- 2);
    }
    else {
      yesterdayDate = currentDate.setDate(currentDate.getDate()- 1);
    }
    let date = new Date(yesterdayDate).toISOString();
    // let date=(new Date(yesterdayDate).getFullYear().toString()+'-'+(new Date(yesterdayDate).getMonth()+1).toString()+'-'+new Date(yesterdayDate).getDate().toString());
    let passedDate = date.slice(0,10);
    console.log(passedDate);
    
    
    
    this.stocks.getAlphaStocks(symbol).subscribe(async (stockData)=>{
      this.submittedStock = true;
      let stockDataKeys=Object.keys(stockData["Time Series (Daily)"]);
      // console.log(stockData["Time Series (Daily)"][passedDate]);
      this.stockData = stockData["Time Series (Daily)"][stockDataKeys[0]];
      // console.log(this.stockData["1. open"]); 
      return await stockData;
    })
    
  }

}
