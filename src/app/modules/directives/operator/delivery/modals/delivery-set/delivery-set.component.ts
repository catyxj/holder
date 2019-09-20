import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DeliveryService} from "../../../../../../shared/delivery.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delivery-set',
  templateUrl: './delivery-set.component.html',
  styleUrls: ['./delivery-set.component.css']
})
export class DeliverySetComponent implements OnInit {
  @Input()
  currentData;
  @Input()
  uid;

  public status;

  constructor(public activeModal: NgbActiveModal,
              private deliveryService: DeliveryService) { }

  ngOnInit() {
  }

  save() {
    let that = this;
    /*this.deliveryService.scrap(this.uid)
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
      });*/
  }

}
