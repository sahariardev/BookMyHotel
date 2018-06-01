import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  baseUrl="http://localhost:8080/";
  fetchurl=this.baseUrl+"v1/hotels/byplacename/";
  placeName="";
  showLoading=false;
  showError=false;
  componentloaded=false;
   
 


  constructor(
              public http:HttpClient,
              public router:Router  
            ) { }
  
  hotels=[];

  ngOnInit() {
  }

  onSearch()
  {
    console.log(this.placeName);
      this.showError=false;
      this.showLoading=true;
      this.componentloaded=false;
      this.hotels=[];
      this.http.get(this.fetchurl+this.placeName).subscribe(res => {
         
        console.log(res);
         let response =<any> res;
         
         for(let c=0;c<response.length;c++)
         {
           this.hotels.push(response[c]);
         }
        this.showLoading=false; 
        this.componentloaded=true;
      }, fail => {
        console.log(fail);    
        this.showLoading=false;
        this.showError=true;
      }); 

  } 

  selectHotel(id)
  {
    this.router.navigateByUrl('/hotel/'+id);
  }



}

interface Hotel{
  name:string,rating:string,address:string,id:string
}
