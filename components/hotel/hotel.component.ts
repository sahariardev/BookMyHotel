import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
 
  baseUrl="http://172.17.0.3:8080/"
  postUrl=this.baseUrl+"v1/hotels/review/add";
  getUrl=this.baseUrl+"v1/hotels/reviews/";

  loadedparam=false;
  id;
  rooms=[
    {
      id:1,
      class:'Single',
      roomNumer:'101',
      wifi:true,
      price:'500',
      tv: true

    },
    {
      id:2,
      class:'Double',
      roomNumer:'201',
      wifi:true,
      price:'600',
      tv: true

    },{
      id:3,
      class:'Single',
      roomNumer:'102',
      wifi:true,
      price:'500',
      tv: true

    },{
      id:4,
      class:'Single',
      roomNumer:'105',
      wifi:true,
      price:'400',
      tv: true

    },
    {
      id:5,
      class:'Double',
      roomNumer:'107',
      wifi:true,
      price:'800',
      tv: true

    },
    {
      id:6,
      class:'Single',
      roomNumer:'101',
      wifi:true,
      price:'400',
      tv: false

    },
    {
      id:7,
      class:'Single',
      roomNumer:'105',
      wifi:true,
      price:'500',
      tv: true

    },
    {
      id:8,
      class:'Single',
      roomNumer:'301',
      wifi:true,
      price:'500',
      tv: true

    },
    {
      id:9,
      class:'Single',
      roomNumer:'401',
      wifi:true,
      price:'500',
      tv: true

    },
    {
      id:10,
      class:'Single',
      roomNumer:'303',
      wifi:true,
      price:'500',
      tv: true

    },
    {
      id:11,
      class:'Double',
      roomNumer:'305',
      wifi:true,
      price:'500',
      tv: true

    }

  ];
  
   showLoading=false;
   reviewData = {
     hotelId:"",
     email:"",
     review:""
     
     
   }
   
   data=[];
      
   showError=false;
   errorMessage="Please fill all the fields."

  constructor(
   private route:ActivatedRoute,
   private router:Router,
  public  http:HttpClient


  ) {
        this.route.params.subscribe((params:Params)=>{
        this.loadedparam=true;
        this.id=params.id;    
        console.log(this.id);
        this.reviewData.hotelId=this.id;
        
        this.init();

       })   
   }

  ngOnInit() {
  }
  goTobook(roomid)
  {
    this.router.navigateByUrl('/book/'+this.id+'/'+roomid);
  }

  save()
  {
    this.reviewData.hotelId=this.id;
    if(this.reviewData.email=="" || this.reviewData.hotelId=="" || this.reviewData.review=="")
    {
      this.showError=true;
      this.errorMessage="Please fill all the fields."


    }
    else
    {
      this.showError=false;
      this.showLoading=true;
      console.log(this.reviewData);
      console.log(this.postUrl); 
        this.http.post(this.postUrl,this.reviewData).subscribe(res => {
        this.showLoading=false;
        this.init();

      },
      fail => {
        console.log(fail);
        this.showLoading=false;
        this.showError=true;
        this.errorMessage="Network error"; 

      }

    );

      
    }
    
  }
  
  init()
  {
    this.http.get(this.getUrl+"/"+this.id).subscribe(res=>{

      this.data=<any>res;
      console.log(this.data);
    },fail=>{

    });

  }
  

}
