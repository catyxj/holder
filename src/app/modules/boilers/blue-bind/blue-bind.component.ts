import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BluetoothService} from "../../../shared/bluetooth.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blue-bind',
  templateUrl: './blue-bind.component.html',
  styleUrls: ['./blue-bind.component.css']
})
export class BlueBindComponent implements OnInit {
  @Input()
  currentData: any;

  public bluetooth;
  public blueteethList = [];

  constructor(public activeModal: NgbActiveModal,
              private blueService: BluetoothService) { }

  ngOnInit() {
    this.getLIstAll();
  }

  getLIstAll() {
    this.blueService.getBlueAll()
      .subscribe( data => {
        this.blueteethList = data;
      }, err => {
        console.log(err);
      });
  }

  save() {
    let data = {
      equipment_id: this.currentData.Uid,
      bluetooth_id: this.bluetooth
    };
    this.blueService.bindEqBlue(data)
      .subscribe(val => {
        Swal(
          '保存成功！',
          '',
          'success'
        );
        this.activeModal.close('ok');
      }, err => {
        Swal(
          '保存失败！',
          err,
          'error'
        );
      });
  }

}
