import { Component, OnInit } from '@angular/core';
import { Boiler } from '../../../boiler';
import { BoilerService } from '../../../shared/boiler.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  boilers: Boiler[] = [];
  boiler: Boiler;
  page = 1;
  totalItems = 0;
  constructor(private boilerService: BoilerService) { }

  ngOnInit() {
    this.getBoilers();

  }

  getBoilers(): void {
    this.boilerService.getBoilers()
      .subscribe(boilers => {this.boilers = boilers.slice(1, 5); this.totalItems = this.boilers.length; });
  }

  getBoiler(id): void {
    this.boilerService.getBoiler(id)
      .subscribe(boiler => this.boiler = boiler);
  }

}
