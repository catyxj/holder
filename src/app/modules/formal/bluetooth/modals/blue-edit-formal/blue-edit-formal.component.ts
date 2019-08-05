import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BluetoothService} from "../../../../../shared/bluetooth.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-blue-edit-formal',
  templateUrl: './blue-edit-formal.component.html',
  styleUrls: ['./blue-edit-formal.component.css']
})
export class BlueEditFormalComponent implements OnInit {
  @Input()
  currentData;
  @Input()
  uid;

  public mac;
  public name;
  public terminal;

  constructor(public activeModal: NgbActiveModal,
              public blueService: BluetoothService) { }

  ngOnInit() {
    this.mac = this.currentData.mac;
    this.name = this.currentData.name;
    this.terminal = this.currentData.terminal_code;
  }

  save() {
    let that = this;
    let post = {
      uid: this.uid,
      mac: this.mac,
      name: this.name,
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
