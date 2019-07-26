import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BluetoothService} from "../../../../../shared/bluetooth.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-blue-scrap-ad',
  templateUrl: './blue-scrap-ad.component.html',
  styleUrls: ['./blue-scrap-ad.component.css']
})
export class BlueScrapAdComponent implements OnInit {
  @Input()
  currentData;
  @Input()
  uid;

  constructor(public activeModal: NgbActiveModal,
              public blueService: BluetoothService) { }

  ngOnInit() {
  }

  save() {
    let that = this;
    this.blueService.scrap(this.uid)
      .subscribe(val => {
        Swal(
          '操作成功！',
          '',
          'success'
        );
        that.activeModal.close('ok');
      }, err => {
        Swal(
          err.message || err,
          '',
          'error'
        );
      });
  }

}
