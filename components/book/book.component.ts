import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

declare var $ :any;

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  

  hotelId;
  roomId;
  loadedparam;
  baseUrl="http://172.17.0.3:8082";
  url=this.baseUrl+"/v1/bookingService/";
  bookedUrl=this.url+"bookedRooms/";
  showDateError=false;
  isavailableurl=this.url+"isavailable/";
  singleDateInputErrorMsg=""; 
  enteredDate="";
  userInputDates=[];
  FormDataErrorMsg="";
  showFormError=false;
  showLoading=false;
  bookingId=null;
  showModal=false;
  user={
    name:'',
    email:'',
    phone:''
  }
  alreadyBookeDates=[];


  formdata={
    
      name : "",
      email:"",
      number:"",
      hotel_id:null,
      room_id:null,
      dates:[]
      
    
  }
  serviceNotAvailable=false;
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private http:HttpClient
  ) 
  { 

      this.route.params.subscribe((params:Params)=>{
      
      this.loadedparam=true;
      this.hotelId=params.hotelid;    
      this.roomId=params.roomid;
        
       this.init();

      });
    
    

  }

  okay()
  {
    this.bookingId=null;
    this.showModal=false;
    this.init();
  }
  init()
  {
    this.showLoading=true;
    this.formdata={
    
      name : "",
      email:"",
      number:"",
      hotel_id:null,
      room_id:null,
      dates:[]
      
    
     }  
    this.clear();
    this.http.get(this.bookedUrl+this.hotelId+"/"+this.roomId).subscribe(res =>{
      this.alreadyBookeDates=<any>res; 
      this.serviceNotAvailable=false; 
      this.showLoading=false;
      
     },fail => {
      this.showLoading=false;
      this.serviceNotAvailable=true;
     });
  }
  addDate()
  {
     //check the is available or not then add it
    

    this.http.get(this.isavailableurl+this.enteredDate+"/"+this.hotelId+"/"+this.roomId).subscribe((res)=>{
      
      if(res)
      {
        
        this.showDateError=false;
        let flag=true;
        for(let c=0;c<this.userInputDates.length;c++)
        {
           if(this.userInputDates[c] == this.enteredDate)
           {
             flag=false;
           } 
        }
        if(flag)
        {
          this.userInputDates.push(this.enteredDate);
        }
        
      }
      else
      {
       this.showDateError=true;
       this.singleDateInputErrorMsg="Already booked on this date. Try some other date."
      }
    
    }
    ,fail => {
      this.showDateError=true;
      this.singleDateInputErrorMsg="Network error. Please try later."  
 
    }
  ) 
    



  }


book()
{
  this.showLoading=true;
  this.showFormError=false;
  if(this.userInputDates.length == 0)
  {
    this.showLoading=false;
    this.FormDataErrorMsg="You have to add dates first";
    this.showFormError=true;

  }
  else if(this.formdata.email == "" || this.formdata.name =="" || this.formdata.number == "" )
  {
    this.showLoading=false;
    this.FormDataErrorMsg="Please fill all fields.";
    this.showFormError=true;
  }
  else
  {
    
    this.formdata.hotel_id=this.hotelId;
    this.formdata.room_id=this.roomId;
    this.formdata.dates=this.userInputDates;
    this.http.post(this.url+"/add",this.formdata).subscribe(res => {
      this.showLoading=false;
      console.log("Getting the booking id :");
      console.log(res);
      this.bookingId=res;
      this.showModal=true;

    });
  }
}

myFilter = (d: Date): boolean => {
  const day = d.getDay();
  let date=d;
  let today=new Date();
  if(date.getFullYear()>=today.getFullYear())
  {
    if(date.getMonth() >= today.getMonth())
    {
      if(date.getFullYear() == today.getFullYear() && date.getMonth() == today.getMonth() && date.getDate()<today.getDate()) 
      {
        return false;
      }
      else
      {
        return true;
      } 
    }
    else
    {
      if(date.getFullYear()>today.getFullYear())
      {
        return true;
      }
      else
      {
        return false;
      }
    }
  }
  else
  {
     return false;    
  }
 
}
dateChange(event: MatDatepickerInputEvent<Date>)
   {
     
     
     let date=this.getFormattedDate(event.value);
     this.enteredDate=date;
     
   }

   getFormattedDate(d:Date)
   {
      let m:any=d.getMonth()+1;
      
     if(m<10)
     {

       m="0"+m;
       
     }
     let day:any=d.getDate();
     if(day<10)
     {
       day="0"+day;
     }
     return d.getFullYear()+"-"+m+"-"+day;
   }

  ngOnInit() {
  }
  clear()
  {
    this.userInputDates=[];
  }




}
