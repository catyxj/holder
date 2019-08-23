import { Component, OnInit } from '@angular/core';
import {TerminalService} from "../../../../../shared/terminal.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-ter-cal1',
  templateUrl: './ter-cal1.component.html',
  styleUrls: ['./ter-cal1.component.css']
})
export class TerCal1Component implements OnInit {
  public uid;
  public code;
  public checked;
  public channelList = [];
  public selectedValue;
  public radioValue;
  public value;

  constructor(private terminalService: TerminalService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.code = this.route.snapshot.paramMap.get('code');
  }



  save() {
    console.log(this.checked);
  }




  goBack() {
    window.history.go(-1);
  }

}
