import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../../../shared/account.service";
import {AcConfigSerComponent} from "../modals/ac-config-ser/ac-config-ser.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-ac-info-ser',
  templateUrl: './ac-info-ser.component.html',
  styleUrls: ['./ac-info-ser.component.css']
})
export class AcInfoSerComponent implements OnInit {
  public basic;

  constructor(private accountService: AccountService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.getInfo();
  }

  getInfo() {
    this.accountService.getInfo()
      .subscribe(data => {
        this.basic = data;
      }, err => {

      });
  }


  // 设置模态框
  editConfig() {
    let that = this;
    const modalRef = this.modalService.open(AcConfigSerComponent, {windowClass: 'modal_md', centered: true});
    modalRef.componentInstance.currentData = this.basic;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.getInfo();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }

}
