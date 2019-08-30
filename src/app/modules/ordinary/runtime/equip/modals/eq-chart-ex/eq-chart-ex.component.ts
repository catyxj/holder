import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-eq-chart-ex',
  templateUrl: './eq-chart-ex.component.html',
  styleUrls: ['./eq-chart-ex.component.css']
})
export class EqChartExComponent implements OnInit {
  @Input()
  param: any;
  option: any;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    console.log(this.param, this.option);
  }

}
