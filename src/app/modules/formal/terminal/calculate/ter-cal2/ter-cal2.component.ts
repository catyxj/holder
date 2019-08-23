import { Component, OnInit } from '@angular/core';
import {TerminalService} from "../../../../../shared/terminal.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-ter-cal2',
  templateUrl: './ter-cal2.component.html',
  styleUrls: ['./ter-cal2.component.css']
})
export class TerCal2Component implements OnInit {
  public uid;
  public code;
  public checked;
  public channelList = [];
  public selectedValue;

  constructor(private terminalService: TerminalService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.code = this.route.snapshot.paramMap.get('code');
  }

  goBack() {
    window.history.go(-1);
  }

}
