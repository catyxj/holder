import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../../../shared/account.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AccountEditFormalComponent} from "../modals/account-edit-formal/account-edit-formal.component";

@Component({
  selector: 'app-account-info-formal',
  templateUrl: './account-info-formal.component.html',
  styleUrls: ['./account-info-formal.component.css']
})
export class AccountInfoFormalComponent implements OnInit {
  public basic;
  public config;
  public operate;
  public expand = [];

  constructor(private accountService: AccountService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.basic = {
      uid: 'asdfa',
      username: '12345646948'
    };
    this.config = {
      account_type: 1,
      account_status: 1,
      privilege: [
        {
          name: 'asdf',
          status: true
        },
        {
          name: 'asdf',
          status: true
        },
        {
          name: 'asdf',
          status: true
        },
        {
          name: 'asdsssssf',
          status: true
        },
        {
          name: '蓝牙支持',
          status: true
        },
        {
          name: '蓝牙支持',
          status: true
        },
        {
          name: '蓝牙支持',
          status: true
        },
        {
          name: '蓝牙支持',
          status: true
        },
        {
          name: '蓝牙支持',
          status: true
        },
        {
          name: '蓝牙支持',
          status: true
        },
        {
          name: '蓝牙支持',
          status: true
        },
        {
          name: '蓝牙支持',
          status: true
        }
      ]
    };
    for (let i = 0; i < this.config.privilege.length; i++) {
      let cf = this.config.privilege[i];
      if (cf.status) {
        this.expand.push(cf);
      }
    }
    this.operate = [
      {
        created_at: '2016-5-10',
        info: 'asdf'
      },
      {
        created_at: '2016-5-10',
        info: 'asdf'
      }
    ];


    this.getBasic();
    this.getConfig();
    this.getOperate();
  }


  // 获取基础信息
  getBasic() {
    this.accountService.getBasic(this.uid)
      .subscribe(data => {
        this.basic = data;
      }, err => {

      });
  }

  // 获取配置信息
  getConfig() {
    this.expand = [];
    this.accountService.getConfig(this.uid)
      .subscribe(data => {
        this.config = data;
        for (let i = 0; i < this.config.privilege.length; i++) {
          let cf = this.config.privilege[i];
          if (cf.status) {
            this.expand.push(cf);
          }
        }
      }, err => {

      });
  }

  // 获取记录信息
  getOperate() {
    this.accountService.getOperate(this.uid)
      .subscribe(data => {
        this.operate = data;
      }, err => {

      });
  }

  // 编辑配置信息模态框
  editConfig() {
    let that = this;
    const modalRef = this.modalService.open(AccountEditFormalComponent, {windowClass: 'modal_md', centered: true});
    modalRef.componentInstance.currentData = this.config;
    modalRef.componentInstance.uid = this.uid;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.getConfig();
        that.getOperate();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }

  changePass() {

  }



}
