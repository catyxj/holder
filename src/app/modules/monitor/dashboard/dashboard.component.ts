import { Component, OnInit } from '@angular/core';
import { BoilerService } from '../../../shared/boiler.service';

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

  constructor(private boilerService: BoilerService) { }

  ngOnInit() {
    this.getBoilers();

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
