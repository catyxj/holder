import { Component, OnInit } from '@angular/core';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BluetoothService} from "../../../../shared/bluetooth.service";
import {BlueEditFormalComponent} from "../modals/blue-edit-formal/blue-edit-formal.component";

import Swal from 'sweetalert2';


@Component({
  selector: 'app-blue-info-formal',
  templateUrl: './blue-info-formal.component.html',
  styleUrls: ['./blue-info-formal.component.css']
})
export class BlueInfoFormalComponent implements OnInit {
  public uid;
  public basic;
  public config;
  public operate;
  public listPage;

  tplModal: NzModalRef;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private modalService: NgbModal,
              private blueService: BluetoothService,
              private nzModal: NzModalService) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.listPage = this.route.snapshot.paramMap.get('page');

    /*this.basic = {
      mac: '1'
    };*/

    this.getBasic();
    this.getOperate();
  }


  // 获取基础信息
  getBasic() {
    this.blueService.getBasic(this.uid)
      .subscribe(data => {
        this.basic = data;
      }, err => {

      });
  }


  // 获取记录信息
  getOperate() {
    this.blueService.getOperate(this.uid)
      .subscribe(data => {
        this.operate = data;
      }, err => {

      });
  }

  // 编辑基础信息模态框
  editBasic() {
    let that = this;
    const modalRef = this.modalService.open(BlueEditFormalComponent, {windowClass: 'modal_md', centered: true});
    modalRef.componentInstance.currentData = this.basic;
    modalRef.componentInstance.uid = this.uid;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.getBasic();
        that.getOperate();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }


  // 报修
  repair() {
    let that = this;
    let title = '确认要报修此蓝牙设备吗？';
    let subtitle = '';
    this.creatModal(title, subtitle, () => {
      // this.checkBatch( [this.uid]);
      this.blueService.repair(this.uid)
        .subscribe( val => {
          Swal(
            '操作成功！',
            '',
            'success'
          );
          that.getBasic();
          that.getOperate();
        }, err => {
          Swal(
            err.message || err,
            '',
            'error'
          );
        });
    });
  }


  creatModal(title, subtitle, call) {
    const that = this;
    this.tplModal = this.nzModal.confirm({
      nzTitle: title,
      nzContent: subtitle,
      nzIconType: 'fill:question-circle',
      nzOnOk: () => {
        call();
        that.tplModal.destroy();
      }
    });
  }

  // 发送批量操作请求
  checkBatch( checked) {
    let that = this;
    let post = {
      data: checked
    };

    this.blueService.repair(post)
      .subscribe(val => {
        Swal(
          '操作成功！',
          '',
          'success'
        );
        that.getBasic();
        that.getOperate();
        // that.router.navigate(['/admin/formal/bluetooth/list']);
      }, err => {
        Swal(
          err.message || err,
          '',
          'error'
        );
      });
  }

}
