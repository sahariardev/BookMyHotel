import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(
public http : HttpClient

  ) { }
  
  baseUrl="http://172.17.0.3:8082";
  url=this.baseUrl+"/v1/bookingService/delete";

  showLoading=false;
  showModal=false;
  showError=false;
  errorMessage="";
formdata = 
{
  id:'',
  email:'',
  phone:''
}
   
delete()
{
  this.showLoading=true;
  if(this.formdata.id=="" || this.formdata.email=="" || this.formdata.phone=="" )
  {
    this.showLoading=false;
    this.showError=true;
    this.errorMessage="Please fill all fields." 
      
  }
  else
  {

    this.http.post(this.url,this.formdata).subscribe(res => {
       
      this.showModal=true;
      this.showError=false;
      this.showLoading=false;
      this.formdata = 
        {
          id:'',
          email:'',
          phone:''
        }
    },fail=>{
     
       this.showError=true;
       this.errorMessage="Network error."
      

    })

  }
}
okay()
{
  this.showModal=false;
}
  ngOnInit() {
  }

}
