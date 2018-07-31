import { Component, OnInit } from '@angular/core';
import {BoilerSocketService} from "../../../shared/boiler-socket.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class RuntimeDashboardComponent implements OnInit {

  public equipment;
  private socket;

  constructor(private boilerWsService: BoilerSocketService) { }

  ngOnInit() {

  }

  initData() {
    let message = {
      uid: 'e9a7bd78-aad3-4950-b90c-da9561208622'
    };
    const wsUrl = `ws://${window.location.host}/equipment_instant`;
    this.socket = this.boilerWsService.creatSocket(wsUrl, message)
      .subscribe(
        data => {
          console.log(data);
          let equipment = JSON.parse(data);
          console.log(equipment);
        },
        err => console.log(err),
        () => console.log('ws结束')
      );
  }


  goBack() {
    window.history.go(-1);
  }

}
