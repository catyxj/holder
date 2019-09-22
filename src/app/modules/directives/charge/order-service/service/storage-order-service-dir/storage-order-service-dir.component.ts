import { Component, OnInit } from '@angular/core';
import {ChargeService} from "../../../../../../shared/charge.service";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-storage-order-service-dir',
  templateUrl: './storage-order-service-dir.component.html',
  styleUrls: ['./storage-order-service-dir.component.css']
})
export class StorageOrderServiceDirComponent implements OnInit {
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
