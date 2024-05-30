import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-view-product-details',
  templateUrl: './view-product-details.component.html',
  styleUrls: ['./view-product-details.component.scss']
})
export class ViewProductDetailsComponent implements OnInit {
  selectedDrugCode: string | null;
  productDetails: any;
  constructor(private route: ActivatedRoute, private http: HttpService) {
    this.selectedDrugCode = this.route.snapshot.paramMap.get("drugCode");
  }
  ngOnInit(): void {
    this.getProductDetailsByCategory();
  }

  getProductDetailsByCategory() {
    if (this.selectedDrugCode != null) {
      const endPoint = "top-deals?drugCode=" + this.selectedDrugCode;
      this.http.getDataFromeServer(endPoint).subscribe((el: any) => {
        if (el && el.length > 0) {
          this.productDetails = el[0];
          console.log("product-detailes", this.productDetails);
        }
      },
        error => {
          console.log(error);
        })
    }
  }

}
