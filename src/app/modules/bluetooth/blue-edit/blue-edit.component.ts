import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BlueBindEqComponent} from "../blue-bind-eq/blue-bind-eq.component";

import Swal from 'sweetalert2';
import {BluetoothService} from "../../../shared/bluetooth.service";
import {OrganizationService} from "../../../shared/organization.service";

@Component({
  selector: 'app-blue-edit',
  templateUrl: './blue-edit.component.html',
  styleUrls: ['./blue-edit.component.css']
})
export class BlueEditComponent implements OnInit {
  @Input()
  currentData;

  public name;
  public equip;
  public org;
  public orgList;
  public mac;

  constructor(public activeModal: NgbActiveModal,
              private modalService: NgbModal,
              private blueService: BluetoothService,
              private orgService: OrganizationService) { }

  ngOnInit() {
    this.name = this.currentData.Name;
    this.org = this.currentData.Organization ? this.currentData.Organization.Uid : '' ;
    this.mac = this.currentData.Mac;
    this.getOrg();
  }

  // 获取企业列表
  getOrg() {
    this.orgService.getOrgList()
      .subscribe( data => {
        this.orgList = data;
      });
  }


  // 绑定
  bind() {
    const modalRef = this.modalService.open(BlueBindEqComponent);
    modalRef.componentInstance.currentData = this.currentData;
    modalRef.result.then((result) => {
      if (result) {
        this.equip = result;
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }


  save() {
    let data = {
      uid: this.currentData.Uid,
      name: this.name,
      orgUid: this.org,
      mac: this.mac
    };
    this.blueService.updateData(data)
      .subscribe( val => {
        Swal(
          '保存成功！',
          '',
          'success'
        );
        this.activeModal.close('ok');
      }, err => {
        alert(err);
        Swal(
          '保存失败！',
          err,
          'error'
        );
      });
  }

}
