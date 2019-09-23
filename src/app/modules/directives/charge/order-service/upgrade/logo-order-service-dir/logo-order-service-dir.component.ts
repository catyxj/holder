import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ChargeService} from "../../../../../../shared/charge.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logo-order-service-dir',
  templateUrl: './logo-order-service-dir.component.html',
  styleUrls: ['./logo-order-service-dir.component.css']
})
export class LogoOrderServiceDirComponent implements OnInit {
  public title;
  public type;
  public info;
  public id;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private chargeService: ChargeService) { }

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type');
    switch (this.type) {
      case '1':
        this.title = '视频监控';
        this.id = 5;
        break;
      case '2':
        this.title = 'LOGO定制';
        this.id = 6;
        break;
      case '3':
        this.title = '集群服务';
        this.id = 7;
        break;
      case '4':
        this.title = '蓝牙支持';
        this.id = 8;
        break;
      case '5':
        this.title = '参数计算';
        this.id = 9;
        break;
      case '6':
        this.title = '设备控制';
        this.id = 10;
        break;
      case '7':
        this.title = '云台监控';
        this.id = 11;
        break;
      case '8':
        this.title = '维保服务';
        this.id = 12;
        break;
    }

    this.getInfo();
  }

  getInfo() {
    this.chargeService.getProductInfo(this.id)
      .subscribe(data => {
        this.info = data[0];
      }, err => {

      });
  }

  save() {
    let that = this;
    let post = {
      item_id: this.info.id,
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
