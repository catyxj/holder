import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {ServiceService} from "../../../shared/service.service";
import {switchAll, switchMap} from "rxjs/internal/operators";

@Component({
  selector: 'app-ser-dashboard3',
  templateUrl: './ser-dashboard3.component.html',
  styleUrls: ['./ser-dashboard3.component.css']
})
export class SerDashboard3Component implements OnInit, OnChanges {
  @Input() currentData;

  public answerList = [];

  constructor(private serviceService: ServiceService) { }

  ngOnInit() {
  }


  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log('current', this.currentData);
    const arr = [];
    this.serviceService.getQDetail(this.currentData)
      // .pipe(
      //   switchAll()
      // )
      .subscribe(data => {
        this.answerList = data;
      });

    /*this.answerList = [
      {
        title: 'asdfadsfadsf'
      },
      {
        title: 'xxxxxxxxxxxxxxasdfaxxxxxxxxxxxxxxxxxxxxxxxxxx'
      },
      {
        title: this.currentData
      }
    ];*/

  }

}
