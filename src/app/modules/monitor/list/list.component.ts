import { Component, OnInit } from '@angular/core';
import {Boiler} from '../../../boiler';
import {BoilerService} from '../../../shared/boiler.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  boilers: Boiler[];
  page = 1;
  totalItems = 0;

  constructor(private boilerService: BoilerService) { }

  ngOnInit() {
    this.getBoilers();

  }

  getBoilers(): void {
    this.boilerService.getBoilers()
      .subscribe(boilers => {this.boilers = boilers; this.totalItems = this.boilers.length; console.log(this.boilers); });
  }

}
