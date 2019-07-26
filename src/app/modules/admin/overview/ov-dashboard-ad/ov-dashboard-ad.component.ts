import { Component, OnInit } from '@angular/core';
import {OverviewService} from "../../../../shared/overview.service";
import {NzIconService} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-ov-dashboard-ad',
  templateUrl: './ov-dashboard-ad.component.html',
  styleUrls: ['./ov-dashboard-ad.component.css']
})
export class OvDashboardAdComponent implements OnInit {
  public terminal;
  public video;
  public bluetooth;

  constructor(private overviewService: OverviewService) {

  }

  ngOnInit() {
    this.terminal = {
      total: 1000,
      inactivated: 150,
      activated: 550,
      service: 100,
      scrapped: 200
    };
    this.video = {
      total: 1000,
      inactivated: 150,
      activated: 550,
      service: 100,
      scrapped: 200
    };

    this.bluetooth = {
      total: 1000,
      inactivated: 150,
      activated: 550,
      service: 100,
      scrapped: 200
    };

    this.getTerminal();
    this.getVideo();
    this.getBlue();
  }

  getTerminal() {
    this.overviewService.getTerminal()
      .subscribe(data => {
        this.terminal = data;
      }, err => {

      });
  }


  getVideo() {
    this.overviewService.getVideo()
      .subscribe(data => {
        this.video = data;
      }, err => {

      });
  }


  getBlue() {
    this.overviewService.getBlue()
      .subscribe(data => {
        this.bluetooth = data;
      }, err => {

      });

  }


}
