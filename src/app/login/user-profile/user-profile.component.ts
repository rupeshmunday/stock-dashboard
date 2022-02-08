import { Component, OnInit ,Input } from '@angular/core';
import { StocksService } from '../../core/stocks.service';
import { Validators , FormBuilder , FormGroup  } from '@angular/forms'; 


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @Input() childMessage : string;
  public s : any ;
  clickedBuy : boolean = false;
  clickedSell : boolean = false;
  clickedUserInfo : boolean = false;
  stockIds : any ;
  symbolData: any = [] ;
  stockForm : FormGroup ;
  clickedAllStocks : any ;
  clickedMyStocks : boolean;

  constructor( private formBuilder: FormBuilder, private stocks: StocksService ) { }


  ngOnInit() {
    this.stockForm = this.formBuilder.group({
      quantity : [ "" ]
    }) 
  }
  viewStock () {
    this.clickedAllStocks = true;
    this.clickedMyStocks = false;
    console.log( this.stockForm.value );
    
    
    this.stocks.stoc().subscribe(async ( serverData ) => {
      
      this.s = serverData['data'];
      console.log(serverData);
      
      return await serverData['data'];
      
    });

  }
  buyStock( id:any ) {
    this.clickedBuy=true;
    this.stocks.buyStock(id,this.stockForm.value).subscribe((data)=>{
      alert("Successfully bought");
      return data;
    });
  }
  clickedStock ( ){
    this.clickedMyStocks = true;
  }
  sellStock ( id:any ) {
    this.clickedSell=true;
    console.log(this.stockForm.value);
    this.stocks.sellStock(id, this.stockForm.value).subscribe((data)=>{
      alert("Successfully sold");
      return data;
    });

  }
  getUserStocks () {
    this.clickedMyStocks=true;
    this.clickedAllStocks=false;
    // this.clickedMyStocks = false;
    return this.stocks.getStocks().subscribe((data) => {
      this.stockIds=data['data'];
      for(let item in data['data']){
        data['data'][item];
        console.log(data['data'][item]);
        // this.symbData.push(this.idToSymb(this.stockIds[item]));
        this.idToSymb(this.stockIds[item]); 
      }
      
      // console.log(this.symbolData[1]['data']['symbol']);
      return data;
    })
  }
  idToSymb ( id ) {
    this.stocks.getStockPerformance( id ).subscribe((symbData)=>{
      this.symbolData.push(symbData['data']['symbol']);
      return symbData;
    } );
    
  }

}
