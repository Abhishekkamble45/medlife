import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/core/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit{
  bookingForm!:FormGroup;
  finalOrderObj:any;
  constructor(private cart:CartService,private fb:FormBuilder,private http:HttpService,private router:Router){
    this.finalOrderObj = this.cart.getOrderDetails();
  }
  ngOnInit(): void {
   this.createFromStructure();
  }

  createFromStructure(){
    this.bookingForm = this.fb.group({
      "customerName":[''],
      "mobileNo":[''],
      "gender":[''],
      "dateOfBirth":[''],
      "emailId":[""],
      "address":this.fb.group({
        "line1":[''],
        "line2":[''],
        "landmark":[''],
        "city":[''],
        "state":[''],
        "pincode":['']
      })
    })
  }

  placeOrder(){
   this.finalOrderObj.orderId = Math.floor(1000000 + Math.random() * 9000000);
   let request = this.bookingForm.value;
   const finalOrderreqest = {...request,...this.finalOrderObj};

   this.http.postDataToServer("orders",finalOrderreqest).subscribe((el:any)=>{
    if(el){
      this.cart.clearProductsFromLocalStorage();
      this.router.navigate(['/cart/confirm-order'])
    }
   })
  }

}
