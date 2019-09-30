import { Component, OnInit } from '@angular/core';
import {ChargeService} from "../../../../../../shared/charge.service";
import Swal from 'sweetalert2';
import {Router} from "@angular/router";


@Component({
  selector: 'app-storage-order-service-dir',
  templateUrl: './storage-order-service-dir.component.html',
  styleUrls: ['./storage-order-service-dir.component.css']
})
export class StorageOrderServiceDirComponent implements OnInit {
  public type;
  public id;
  public timeList;
  public currentData;
  public start;
  public end;

  constructor(private chargeService: ChargeService,
              private router: Router) { }

  ngOnInit() {
    this.getInfo();
    this.getDate();
  }

  getInfo() {
    /*this.timeList = [
      {
        name: 'aaaa',
        id: 1,
        price: 300,
        description: 'aaaaaa'
      },
      {
        name: 'bbbb',
        id: 2,
        price: 400,
        description: 'bbbbb'
      },
    ];
    this.type = this.timeList[0];*/

    this.id = 13;
    this.chargeService.getProductInfo(this.id)
      .subscribe(data => {
        this.timeList = data;
        this.type = this.timeList[0];
      }, err => {

      });
  }

  getDate() {
    this.chargeService.getProductDate()
      .subscribe(data => {
        this.start = data.begin;
        this.end = data.end;
      }, err => {

      });
  }



  save() {
    let that = this;
    let post = {
      item_id: this.type.id,
      number: 1
    };
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
