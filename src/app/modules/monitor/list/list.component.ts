import { Component, OnInit } from '@angular/core';
import {Boiler} from '../../../boiler';
import {BoilerService} from '../../../shared/boiler.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  boilers: any = [];
  page = 1;
  totalItems = 0;
  search: string;

  constructor(private boilerService: BoilerService) { }

  ngOnInit() {
    this.getBoilers();

  }

  getBoilers(): void {
    /*this.boilerService.getBoilers(this.page, this.search)
      .subscribe(boilers => {this.boilers = boilers.params; this.totalItems = boilers.counts; console.log(this.boilers); });*/
  }

}
