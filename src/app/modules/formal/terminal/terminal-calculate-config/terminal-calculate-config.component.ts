import { Component, OnInit } from '@angular/core';
import {TerminalService} from "../../../../shared/terminal.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-terminal-calculate-config',
  templateUrl: './terminal-calculate-config.component.html',
  styleUrls: ['./terminal-calculate-config.component.css']
})
export class TerminalCalculateConfigComponent implements OnInit {
  public uid;
  public code;

  constructor(private terminalService: TerminalService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.code = this.route.snapshot.paramMap.get('code');
  }

  getCal() {

  }


  goBack() {
    window.history.go(-1);
  }

}
