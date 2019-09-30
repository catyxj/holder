import { Component, OnInit } from '@angular/core';
import {ChargeService} from "../../../../../shared/charge.service";

import Swal from 'sweetalert2';
import {Router} from "@angular/router";

@Component({
  selector: 'app-traffic-order-service-dir',
  templateUrl: './traffic-order-service-dir.component.html',
  styleUrls: ['./traffic-order-service-dir.component.css']
})
export class TrafficOrderServiceDirComponent implements OnInit {
  public time;
  public info;
  public id;

  constructor(private chargeService: ChargeService,
              public router: Router) { }

  ngOnInit() {
    this.id = 14;
    this.getInfo();
  }

  getInfo() {
     this.chargeService.getProductInfo(this.id)
       .subscribe(data => {
         this.info = data;
       }, err => {

       });
  }

  save() {
    let that = this;
    let post = {
      item_id: this.id,
      number: 0,
      ship_name: '',
      ship_tel: '',
      ship_address: ''
    }
    this.chargeService.submitOrder(post)
      .subscribe(val => {
        let uid = val.order_sn;
        that.router.navigate(['/dir/charge/purchase/payment', uid]);
      }, err => {
        Swal(
          err.message || err,
          '',
          'error'
        );
      });
  }


}
