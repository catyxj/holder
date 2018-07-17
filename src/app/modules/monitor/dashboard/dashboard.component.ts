import { Component, OnInit } from '@angular/core';
import { BoilerService } from '../../../shared/boiler.service';
import {Observable} from "rxjs/index";
import {BoilerSocketService} from '../../../shared/boiler-socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  boilers: any = [];
  boiler: any;
  page = 1;
  totalItems = 0;
  search: string;

  constructor(private boilerService: BoilerService,
              private boilerWsService: BoilerSocketService) { }

  ngOnInit() {
    this.boilerWsService.creatSocket('ws://localhost:8000')
      .subscribe(
        data => console.log(data),
        err => console.log(err),
        () => console.log('ws结束')
      );

    this.sendMessage({page: this.page, search: this.search});
    // this.getBoilers();

  }

  sendMessage(message) {
    this.boilerWsService.sendMessage(message);
  }


  getBoilers(): void {
    /*this.boilerService.getBoilers(this.page, this.search)
      .subscribe(boilers => {this.boilers = boilers.params.slice(1, 5); this.totalItems = this.boilers.length; });*/
  }

  /*getBoiler(id): void {
    this.boilerService.getBoiler(id)
      .subscribe(boiler => this.boiler = boiler);
  }*/

}
