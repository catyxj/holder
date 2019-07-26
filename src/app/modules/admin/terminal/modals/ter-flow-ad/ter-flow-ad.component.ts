import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TerminalService} from "../../../../../shared/terminal.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-ter-flow-ad',
  templateUrl: './ter-flow-ad.component.html',
  styleUrls: ['./ter-flow-ad.component.css']
})
export class TerFlowAdComponent implements OnInit {
  @Input()
  currentData;
  // @Input()
  // uid;

  public iccid;
  public flowInfo;
  public isSpinning = false;
  public errMes;
  public err = false;


  constructor(public activeModal: NgbActiveModal,
              private terminalService: TerminalService) { }

  ngOnInit() {
    this.iccid = this.currentData.sms_code;
    this.isSpinning = true;
    this.terminalService.getFlow(this.iccid)
      .subscribe(data => {
        this.isSpinning = false;
        this.flowInfo = data;
      }, err => {
        this.isSpinning = false;
        this.err = true;
        this.errMes = err.message || err;
      });
  }

}
