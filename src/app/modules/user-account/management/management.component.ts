import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  @Input()
  currentData: any;
  currentUser: any;

  public manageList = [];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    // console.log(this.currentData, this.currentUser);
    this.manageList = [
      {name: 'aaaaa', show: true},
      {name: 'bbbbb', show: false},
      {name: 'ccccc', show: true},
      {name: 'dddddd', show: false},
      {name: '维保记录', show: true},
      {name: 'asdfaf', show: false}
    ];
  }

}
