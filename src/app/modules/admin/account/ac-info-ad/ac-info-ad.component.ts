import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../../../shared/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AcEcofAdComponent} from "../modals/ac-ecof-ad/ac-ecof-ad.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AcDisableAdComponent} from "../modals/ac-disable-ad/ac-disable-ad.component";

@Component({
  selector: 'app-ac-info-ad',
  templateUrl: './ac-info-ad.component.html',
  styleUrls: ['./ac-info-ad.component.css']
})
export class AcInfoAdComponent implements OnInit {
  public uid;
  public basic;
  public config;
  public operate;
  public expand = [];

  public listPage;

  constructor(private accountService: AccountService,
              private route: ActivatedRoute,
              public router: Router,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.listPage = this.route.snapshot.paramMap.get('page');

    let roleId = parseInt(localStorage.getItem('roleId'));
    if (roleId === 10) {
      this.router.navigate(['/admin']);
    }

    /*this.basic = {
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
    ];*/


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
    const modalRef = this.modalService.open(AcEcofAdComponent, {windowClass: 'modal_md', centered: true});
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

  // 账号禁用模态框
  disable() {
    let that = this;
    const modalRef = this.modalService.open(AcDisableAdComponent, {windowClass: 'modal_md', centered: true});
    modalRef.componentInstance.currentData = this.config;
    modalRef.componentInstance.uid = this.uid;
    modalRef.componentInstance.basic = this.basic;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.getConfig();
        that.getOperate();
      }
    }, (reason) => {
      console.log(reason);
    });
  }


  // 进入
  entry() {
    this.accountService.entry(this.uid)
      .subscribe(val => {
        localStorage.setItem('authToken', val.Auth);
        localStorage.setItem('roleId', val.roleId);
        window.location.reload();
        // this.router.navigate(['/admin']);
      }, err => {

      });
  }

  goBack() {
    window.close();
  }


}
