import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TerminalService} from "../../../../../shared/terminal.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-ter-basic-config-ad',
  templateUrl: './ter-basic-config-ad.component.html',
  styleUrls: ['./ter-basic-config-ad.component.css']
})
export class TerBasicConfigAdComponent implements OnInit {
  @Input()
  currentData;
  @Input()
  uid;

  public code;
  public version;
  public sim;
  public account;
  public account2;

  constructor(public activeModal: NgbActiveModal,
              private terminalService: TerminalService) { }

  ngOnInit() {
    this.code = this.currentData.terminal_code;
    this.version = this.currentData.fw_ver;
    this.sim = this.currentData.sms_code;
    this.account = this.currentData.username;
    this.account2 = this.currentData.use_username;
  }

  save() {
    let that = this;
    let post = {
      uid: this.uid,
      terminal_code: this.code,
      fw_ver: this.version,
      sms_code: this.sim,
      account: this.account,
      use_account: this.account2
    };
    console.log(post);

    this.terminalService.updateBasic(post)
      .subscribe(val => {
        Swal(
          '操作成功！',
          '',
          'success'
        );
        that.activeModal.close('ok');
      }, err => {
        Swal(
          err.message,
          '',
          'error'
        );
      });


  }

}
