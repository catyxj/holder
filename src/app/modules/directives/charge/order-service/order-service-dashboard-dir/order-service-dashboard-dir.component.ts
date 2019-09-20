import { Component, OnInit } from '@angular/core';
import {ChargeService} from "../../../../../shared/charge.service";

@Component({
  selector: 'app-order-service-dashboard-dir',
  templateUrl: './order-service-dashboard-dir.component.html',
  styleUrls: ['./order-service-dashboard-dir.component.css']
})
export class OrderServiceDashboardDirComponent implements OnInit {
  public upgrade;

  constructor(private chargeService: ChargeService) { }

  ngOnInit() {
    this.getList();
  }

  // 获取
  getList () {
    this.chargeService.getProductList()
      .subscribe(data => {

      }, err => {

      });
  }



}
