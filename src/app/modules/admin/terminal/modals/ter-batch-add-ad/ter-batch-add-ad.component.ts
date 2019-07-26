import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TerminalService} from "../../../../../shared/terminal.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-ter-batch-add-ad',
  templateUrl: './ter-batch-add-ad.component.html',
  styleUrls: ['./ter-batch-add-ad.component.css']
})
export class TerBatchAddAdComponent implements OnInit {

  public code1;
  public code2;
  public version;
  public sim1;
  public sim2;
  public account;
  public isSpinning = false;

  constructor(public activeModal: NgbActiveModal,
              private terminalService: TerminalService) { }

  ngOnInit() {
  }

  save() {
    let that = this;
    let post = {
      code_start: this.code1,
      code_end: this.code2,
      fw_ver: this.version,
      sms_start: this.sim1,
      sms_end: this.sim2,
      account: this.account
    };
    console.log(post);
    this.isSpinning = true;
    this.terminalService.addBatchData(post)
      .subscribe(val => {
        // console.log(val);
        that.isSpinning = false;
        Swal(
          '操作成功！',
          '',
          'success'
        );
        that.activeModal.close('ok');
      }, err => {
        that.isSpinning = false;
        Swal(
          err.message || err,
          '',
          'error'
        );


      });

  }

}
