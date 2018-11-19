import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chart-expand',
  templateUrl: './chart-expand.component.html',
  styleUrls: ['./chart-expand.component.css']
})
export class ChartExpandComponent implements OnInit {
  @Input()
  param: any;
  option: any;


  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    console.log(this.param, this.option);
  }

}
