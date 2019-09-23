import { Component, OnInit } from '@angular/core';
import {ChargeService} from "../../../../../shared/charge.service";

@Component({
  selector: 'app-order-service-dashboard-dir',
  templateUrl: './order-service-dashboard-dir.component.html',
  styleUrls: ['./order-service-dashboard-dir.component.css']
})
export class OrderServiceDashboardDirComponent implements OnInit {
  public upgrade;
  public info;

  constructor(private chargeService: ChargeService) { }

  ngOnInit() {
    this.getList();
  }

  // 获取信息
  getList () {
    this.chargeService.getProductList()
      .subscribe(data => {
        this.info = data;

        for (let i = 0; i < this.info.length; i++) {
          let inf = this.info[i];

        }

      }, err => {

      });
  }



}
