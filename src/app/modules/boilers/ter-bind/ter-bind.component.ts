import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ter-bind',
  templateUrl: './ter-bind.component.html',
  styleUrls: ['./ter-bind.component.css']
})
export class TerBindComponent implements OnInit {

  @Input()
  currentData: any;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
