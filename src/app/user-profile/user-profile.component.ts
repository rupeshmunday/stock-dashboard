import { Component, OnInit } from '@angular/core';
import { StocksService } from '../core/stocks.service';
import { Validators , FormBuilder , FormGroup  } from '@angular/forms'; 

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userName = 'Rupesh';
  public s : any ;
  clickedBuy : boolean = false;
  clickedSell : boolean = false;
  clickedMyStocks : boolean = false;
  stockForm : FormGroup ;
  

  constructor( private formBuilder: FormBuilder, private stocks: StocksService ) { }


  ngOnInit() {
    this.stockForm = this.formBuilder.group({
      quantity : ["" ]
    }) 
  }
  viewStock() {
    this.clickedMyStocks = true;
    console.log(this.stockForm.value);
    
    
    this.stocks.stoc().subscribe(async ( serverData ) => {
      
      // this.s = serverData;
      // this.s = serverData['data'][0];
      // this.s = serverData['data'][0]; 
      this.s = serverData['data'];
      console.log(serverData);
      
      return await serverData['data'];
      
    });

  }
  buyStock(id:any) {
    this.clickedBuy=true;
    //console.log(id);
    this.stocks.buyStock(id,this.stockForm.value).subscribe((data)=>{
      alert("Successfully bought");
      return data;
    });
  }
  clickedStock(){
    this.clickedMyStocks = true;
  }
  sellStock(id:any) {
    this.clickedSell=true;
    console.log(this.stockForm.value);
    this.stocks.sellStock(id, this.stockForm.value).subscribe((data)=>{
      alert("Successfully sold");
      return data;
    });

  }

}
