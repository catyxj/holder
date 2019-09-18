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
  public user;

  constructor(private eptService: BoilerService) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.getData();
  }

  getData() {
    this.eptService.getNoticeInfo(this.uid)
      .subscribe(data => {
          this.info = data;
      }, err => {

      });
  }

}
