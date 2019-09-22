import { Component, OnInit } from '@angular/core';
import {ChargeService} from "../../../../../shared/charge.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-traffic-order-service-dir',
  templateUrl: './traffic-order-service-dir.component.html',
  styleUrls: ['./traffic-order-service-dir.component.css']
})
export class TrafficOrderServiceDirComponent implements OnInit {
  public time;
  public info;

  constructor(private chargeService: ChargeService) { }

  ngOnInit() {
    this.getInfo();
  }

  getInfo() {
     this.chargeService.getProductInfo()
       .subscribe(data => {
         this.info = data;
       }, err => {

       });
  }

  save() {
    let that = this;
    let post = {

    }
    this.chargeService.submitOrder(post)
      .subscribe(val => {

      }, err => {
        Swal(
          err.message || err,
          '',
          'error'
        );
      });
  }


}
