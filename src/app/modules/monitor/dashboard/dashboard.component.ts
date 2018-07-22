import {Component, OnDestroy, OnInit} from '@angular/core';
import { BoilerService } from '../../../shared/boiler.service';
import {Observable} from "rxjs/index";
import {BoilerSocketService} from '../../../shared/boiler-socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  boilers: any = [];
  boiler: any;
  page = 1;
  pageSize = 10;
  totalItems = 0;
  search: string;

  constructor(private boilerService: BoilerService,
              private boilerWsService: BoilerSocketService) { }

  ngOnInit() {
    let message = {
      uid: 'e9a7bd78-aad3-4950-b90c-da9561208622'
    };
    const wsUrl = `ws://${window.location.host}/equipment_instant`;
    this.boilerWsService.creatSocket(wsUrl, JSON.stringify(message))
      .subscribe(
        data => console.log(data),
        err => console.log(err),
        () => console.log('ws结束')
      );
    // this.boilerWsService.sendMessage('680001');
    // this.getBoilers();

  }

  sendMessage(message) {
    this.boilerWsService.sendMessage(message);
  }


  getBoilers(): void {
    this.boilerService.getBoilers(this.page, this.pageSize, this.search)
      .subscribe(data => {
        this.boilers = data.params.slice(0, 4);
        this.totalItems = data.counts;
      });
  }

  /*getBoiler(id): void {
    this.boilerService.getBoiler(id)
      .subscribe(boiler => this.boiler = boiler);
  }*/

  pageChange() {
    this.sendMessage({page: this.page});
  }


  btn1() {
    this.sendMessage({uid: 'e9a7bd78-aad3-4950-b90c-da9561208622'});
  }

  btn2() {
    this.sendMessage({uid: '6d4112a4-fec8-4689-9888-94b8b0d1535b'});
  }


  ngOnDestroy() { console.log(`onDestroy`); }


}
