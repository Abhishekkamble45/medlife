import { Injectable } from '@angular/core';
import { SharedService } from '../core/services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private shared:SharedService) { }

  addItemToCart(item:any){
    let cartItems:any = this.getProductsDataFromLocalStoarge();
    cartItems.push(item);
    localStorage.setItem("cartItem",JSON.stringify(cartItems));
    this.shared.emitItem(cartItems.length);
  }

  getProductsDataFromLocalStoarge(){
    let items = localStorage.getItem("cartItem");
    if(items){
      items = JSON.parse(items);
      return items;
    }else{
      return [];
    }
  }
}