import { Component, OnInit } from '@angular/core';
import {ChargeService} from "../../../../../shared/charge.service";

@Component({
  selector: 'app-order-service-dashboard-dir',
  templateUrl: './order-service-dashboard-dir.component.html',
  styleUrls: ['./order-service-dashboard-dir.component.css']
})
export class OrderServiceDashboardDirComponent implements OnInit {
  public upgrade = {
    video: false,
    logo: false,
    cluster: false,
    bluetooth: false,
    cal: false,
    eptCtrl: false,
    vCtrl: false,
    maintain: false,
    face: false,
    attend: false
  };
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
            switch (inf.id) {
              case 5:
                this.upgrade.video = inf.have;
                break;
              case 6:
                this.upgrade.logo = inf.have;
                break;
              case 7:
                this.upgrade.cluster = inf.have;
                break;
              case 8:
                this.upgrade.bluetooth = inf.have;
                break;
              case 9:
                this.upgrade.cal = inf.have;
                break;
              case 10:
                this.upgrade.eptCtrl = inf.have;
                break;
              case 11:
                this.upgrade.vCtrl = inf.have;
                break;
              case 12:
                this.upgrade.maintain = inf.have;
                break;
              case 15:
                this.upgrade.attend = inf.have;
                break;
              case 16:
                this.upgrade.face = inf.have;
                break;
            }
        }

      }, err => {

      });
  }



}
