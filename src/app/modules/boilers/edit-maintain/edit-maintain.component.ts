import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-edit-maintain',
  templateUrl: './edit-maintain.component.html',
  styleUrls: ['./edit-maintain.component.css']
})
export class EditMaintainComponent implements OnInit {

  @Input()
  currentData: any;

  public date;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.date = {
      gauge: {
        year: parseInt(this.currentData.InspectGaugeDateNext.slice(0, 4)),
        month: parseInt(this.currentData.InspectGaugeDateNext.slice(5, 7)),
        day: parseInt(this.currentData.InspectGaugeDateNext.slice(8, 10))
      },
      outer: {
        year: parseInt(this.currentData.InspectOuterDateNext.slice(0, 4)),
        month: parseInt(this.currentData.InspectOuterDateNext.slice(5, 7)),
        day: parseInt(this.currentData.InspectOuterDateNext.slice(8, 10))
      },
      inner: {
        year: parseInt(this.currentData.InspectInnerDateNext.slice(0, 4)),
        month: parseInt(this.currentData.InspectInnerDateNext.slice(5, 7)),
        day: parseInt(this.currentData.InspectInnerDateNext.slice(8, 10))
      },
      valve : {
        year: parseInt(this.currentData.InspectValveDateNext.slice(0, 4)),
        month: parseInt(this.currentData.InspectValveDateNext.slice(5, 7)),
        day: parseInt(this.currentData.InspectValveDateNext.slice(8, 10))
      }
    };
    console.log(this.date);
  }

  open(dp1, dp2, dp3, dp4) {
    dp2.close();
    dp3.close();
    dp4.close();
    dp1.toggle();
  }


}
