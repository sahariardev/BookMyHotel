import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
 
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
  
  constructor(
   private route:ActivatedRoute,
   private router:Router


  ) {
        this.route.params.subscribe((params:Params)=>{
        this.loadedparam=true;
        this.id=params.id;    
        console.log(this.id);  
       })   
   }

  ngOnInit() {
  }
  goTobook(roomid)
  {
    this.router.navigateByUrl('/book/'+this.id+'/'+roomid);
  }

}
