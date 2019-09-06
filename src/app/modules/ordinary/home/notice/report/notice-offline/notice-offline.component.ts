import { Component, OnInit } from '@angular/core';
import {BoilerService} from "../../../../../../shared/boiler.service";

@Component({
  selector: 'app-notice-offline',
  templateUrl: './notice-offline.component.html',
  styleUrls: ['./notice-offline.component.css']
})
export class NoticeOfflineComponent implements OnInit {
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
