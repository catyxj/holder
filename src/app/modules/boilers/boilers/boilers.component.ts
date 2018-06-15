import { Component, OnInit } from '@angular/core';
import {BoilerService} from '../../../shared/boiler.service';
import {Boiler} from '../../../boiler';

@Component({
  selector: 'app-boilers',
  templateUrl: './boilers.component.html',
  styleUrls: ['./boilers.component.css']
})
export class BoilersComponent implements OnInit {

  boilers: Boiler[] = [];
  boiler: Boiler;
  constructor(private boilerService: BoilerService) { }

  ngOnInit() {
    this.getBoilers();
  }

  getBoilers(): void {
    this.boilerService.getBoilers()
      .subscribe(boilers => this.boilers = boilers)
  }

}
