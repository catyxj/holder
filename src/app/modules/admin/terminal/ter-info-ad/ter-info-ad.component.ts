import { Component, OnInit } from '@angular/core';
import {TerminalService} from "../../../../shared/terminal.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TerBasicConfigAdComponent} from "../modals/ter-basic-config-ad/ter-basic-config-ad.component";
import {TerScrapAdComponent} from "../modals/ter-scrap-ad/ter-scrap-ad.component";
import {TerFlowAdComponent} from "../modals/ter-flow-ad/ter-flow-ad.component";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {ComfirmComponent} from "../../../directives/alert/comfirm/comfirm.component";

import Swal from 'sweetalert2';
import {switchMap} from "rxjs/internal/operators";

@Component({
  selector: 'app-ter-info-ad',
  templateUrl: './ter-info-ad.component.html',
  styleUrls: ['./ter-info-ad.component.css']
})
export class TerInfoAdComponent implements OnInit {
  public uid;
  public basic;
  // public config;
  public operate;
  public status;

  tplModal: NzModalRef;

  public listPage;

  constructor(private terminalService: TerminalService,
              private route: ActivatedRoute,
              public router: Router,
              private modalService: NgbModal,
              private nzModal: NzModalService) { }

  ngOnInit() {
    // this.uid = this.route.snapshot.paramMap.get('uid');
    // this.listPage = this.route.snapshot.paramMap.get('page');
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        console.log(params);
        this.uid = params.get('uid');
        this.listPage = params.get('page');
        this.status = params.get('status');
        if (!this.status) {
          this.status = '';
        }
        return (params.get('status') || []);
      })
    ).subscribe();
    /*this.basic = {
      terminal_code: '122334',
      fw_ver: 12,
      sms_code: 'asdfasdf',
      status: 4
    };*/
    /*this.config = {

    };*/
    /*this.operate = [
      {
        created_at: '2019-9-8',
        info: 'asdfa'
      },
      {
        created_at: '2019-9-8',
        info: 'asdfa'
      }
    ];*/

    this.getBasic();
    this.getOperate();
  }


  // 获取基础信息
  getBasic() {
    this.terminalService.getBasic(this.uid)
      .subscribe(data => {
        this.basic = data;
      }, err => {

      });
  }


  // 获取记录信息
  getOperate() {
    this.terminalService.getOperate(this.uid)
      .subscribe(data => {
        this.operate = data;
      }, err => {

      });
  }

  // 编辑基础信息模态框
  editBasic() {
    let that = this;
    const modalRef = this.modalService.open(TerBasicConfigAdComponent, {windowClass: 'modal_md', centered: true});
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

  // 终端报废模态框
  scrap() {
    let that = this;
    const modalRef = this.modalService.open(TerScrapAdComponent, {windowClass: 'modal_md', centered: true});
    modalRef.componentInstance.currentData = this.basic;
    modalRef.componentInstance.uid = this.uid;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.getBasic();
        that.getOperate();
      }
    }, (reason) => {
      console.log(reason);
    });
  }


  // 数据流量查询模态框
  flowInfo() {
    let that = this;
    const modalRef = this.modalService.open(TerFlowAdComponent, {windowClass: 'modal_md', centered: true});
    modalRef.componentInstance.currentData = this.basic;
    // modalRef.componentInstance.uid = this.uid;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.basic();
        that.getOperate();
      }
    }, (reason) => {
      console.log(reason);
    });
  }



  // 删除
  deleteData() {
    let title = '确认要删除此终端吗？';
    let subtitle = '';
    this.creatModal(title, subtitle, () => {
      this.checkBatch( [this.uid]);
    });
  }


  creatModal(title, subtitle, call) {
    let that = this;
    this.tplModal = this.nzModal.create({
      nzTitle: '',
      nzContent: ComfirmComponent,
      nzComponentParams: {
        title: title,
        subtitle: subtitle
      },
      nzMaskClosable: true,
      nzClosable: false,
      nzClassName: 'comfirm_modal',
      nzWidth: 440,
      nzFooter: [
        {
          label: '取消',
          shape: 'default',
          onClick: () => that.tplModal.destroy()
        },
        {
          label: '确定',
          type: 'primary',
          onClick: () => {
            call();
            that.tplModal.destroy();
          }
        }
      ],
    });
  }

  // 发送批量操作请求
  checkBatch( checked) {
    let that = this;
    let post = {
      data: checked
    };

    this.terminalService.deleteData(post)
      .subscribe(val => {
        Swal(
          '操作成功！',
          '',
          'success'
        );
        that.router.navigate(['/admin/ad/terminal/list']);
      }, err => {
        Swal(
          err.message || err,
          '',
          'error'
        );
      });
  }



}
