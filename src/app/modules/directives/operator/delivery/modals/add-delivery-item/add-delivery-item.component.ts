import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DeliveryService} from "../../../../../../shared/delivery.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-delivery-item',
  templateUrl: './add-delivery-item.component.html',
  styleUrls: ['./add-delivery-item.component.css']
})
export class AddDeliveryItemComponent implements OnInit {
  @Input()
  uid;

  public code;
  public type;
  public ver;

  constructor(public activeModal: NgbActiveModal,
              private deliveryService: DeliveryService) { }

  ngOnInit() {
  }

  save() {
    let that = this;
    let post = {
      item_code: this.code,
      item_type: parseInt(this.type),
      remark: this.ver,
      order_sn: this.uid
    }
    this.deliveryService.addDelivery(post)
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
