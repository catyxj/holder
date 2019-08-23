import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../../../../shared/user.service";
import {MAccountBasicFComponent} from "../modals/m-account-basic-f/m-account-basic-f.component";
import {ActivatedRoute} from "@angular/router";
import {MaintainService} from "../../../../../shared/maintain.service";

import Swal from 'sweetalert2';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-m-account-info-formal',
  templateUrl: './m-account-info-formal.component.html',
  styleUrls: ['./m-account-info-formal.component.css']
})
export class MAccountInfoFormalComponent implements OnInit {
  public uid;
  public listPage;
  public user;
  public operate;
  tplModal: NzModalRef;

  constructor(private modalService: NgbModal,
              private route: ActivatedRoute,
              private nzModal: NzModalService,
              private maintainService: MaintainService) {}

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.listPage = this.route.snapshot.paramMap.get('page');
    this.getInfo();
    this.getOperate();
  }


  getInfo() {
    this.user = {
      username: 'aaaaa',
      status: 1,
      role_id: 10,
      name: 'asdfa',
      org_name: '所属单位',
      org_tag: 1,
      location_id: 110101,
      location_name: '某省某市某区县 某某某街道',
      email: 'zhangsan@123.com'
    };
  }

  refresh() {
    this.getInfo();
    this.getOperate();
  }


  // 获取记录信息
  getOperate() {
    this.operate = [
      {
        uid: 'asdf',
        name: 'aaa',
        terminal_code: '610002',
        template_name: '某炉型锅炉模版',
        created_at: '2016-5-10',
        count: 12
      },
      {
        uid: 'asdf',
        name: 'aaa',
        terminal_code: '610002',
        template_name: '某炉型锅炉模版',
        created_at: '2016-5-10',
        count: 12
      }
    ];
    // this.accountService.getOperate(this.uid)
    //   .subscribe(data => {
    //     this.operate = data;
    //   }, err => {
    //
    //   });
  }

  // 编辑配置信息模态框
  editConfig() {
    let that = this;
    const modalRef = this.modalService.open(MAccountBasicFComponent, {windowClass: 'modal_m', centered: true});
    modalRef.componentInstance.currentData = this.user;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.getOperate();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }


  // 禁用
  dataDisabled() {
    let that = this;
    let title = '确认要禁用此账号吗？';
    let subtitle = '';
    this.creatModal(title, subtitle, () => {
      let post = {
        data: [this.uid]
      };
      this.maintainService.deleteData(post)
        .subscribe(val => {
          Swal(
            '操作成功！',
            '',
            'success'
          );
          that.getInfo();
          that.getOperate();
        }, err => {
          Swal(
            '操作失败！',
            err.message || err,
            'error'
          );
        });
    });

  }


  creatModal(title, subtitle, call) {
    const that = this;
    this.tplModal = this.nzModal.confirm({
      nzTitle: title,
      nzContent: '',
      nzIconType: 'fill:question-circle',
      nzOnOk: () => {
        call();
        that.tplModal.destroy();
      }
    });
  }




}
