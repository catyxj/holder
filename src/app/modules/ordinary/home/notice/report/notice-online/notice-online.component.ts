import {Component, Input, OnInit} from '@angular/core';
import {BoilerService} from "../../../../../../shared/boiler.service";

@Component({
  selector: 'app-notice-online',
  templateUrl: './notice-online.component.html',
  styleUrls: ['./notice-online.component.css']
})
export class NoticeOnlineComponent implements OnInit {
  @Input()
  uid;
  public info;

  constructor(private eptService: BoilerService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.eptService.getNoticeInfo()
      .subscribe(data => {
          this.info = data;
      }, err => {

      });
  }

}
