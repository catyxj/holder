import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BluetoothService} from "../../../../../shared/bluetooth.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-blue-basic-config-ad',
  templateUrl: './blue-basic-config-ad.component.html',
  styleUrls: ['./blue-basic-config-ad.component.css']
})
export class BlueBasicConfigAdComponent implements OnInit {
  @Input()
  currentData;
  @Input()
  uid;

  public mac;
  public name;
  public account;
  public terminal;

  constructor(public activeModal: NgbActiveModal,
              public blueService: BluetoothService) { }

  ngOnInit() {
    this.mac = this.currentData.mac;
    this.name = this.currentData.name;
    this.account = this.currentData.username;
    this.terminal = this.currentData.terminal_code;
  }

  save() {
    let that = this;
    let post = {
      uid: this.uid,
      mac: this.mac,
      name: this.name,
      username: this.account,
      terminal_code: this.terminal,
    };
    this.blueService.updateBasic(post)
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
