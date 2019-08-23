import { Component, OnInit } from '@angular/core';
import {TerminalService} from '../../../../shared/terminal.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {ComfirmComponent} from '../../../directives/alert/comfirm/comfirm.component';
import {TerFlowAdComponent} from '../../../admin/terminal/modals/ter-flow-ad/ter-flow-ad.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-terminal-info-formal',
  templateUrl: './terminal-info-formal.component.html',
  styleUrls: ['./terminal-info-formal.component.css']
})
export class TerminalInfoFormalComponent implements OnInit {
  public uid;
  public code;
  public basic;
  public operate;
  tplModal: NzModalRef;
  public listPage;

  public baudRateList = []; // 波特率下拉列表
  public heartbeatList = []; // 心跳包频率下拉列表
  public baud_rate;
  public heart_beat;
  public isSpinning;

  constructor(private terminalService: TerminalService,
              private route: ActivatedRoute,
              public router: Router,
              private modalService: NgbModal,
              private nzModal: NzModalService) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.code = this.route.snapshot.paramMap.get('code');
    this.listPage = this.route.snapshot.paramMap.get('page');

    this.getCmtList();
    this.getOperate();

    /*this.basic = {
      terminal_code: '122334',
      fw_ver: 12,
      sms_code: 'asdfasdf',
      status: 4,
      plat_ver: 1,
      term_ver: 0
    };*/

    /*this.operate = [
      {
        created_at: '2019-1-2',
        info: 'asdfasdf'
      },
      {
        created_at: '2019-11-2',
        info: 'aasdfadfadsfaf'
      }
    ];*/

  }


  // 获取通信参数下拉列表
  getCmtList() {
    this.terminalService.getCmtParam()
      .subscribe(data => {
        this.baudRateList = data.baud_rate;  // 波特率
        this.heartbeatList = data.heart_beat;  // 心跳包频率

        this.getBasic();
      });
  }


  // 获取基础信息
  getBasic() {
    this.terminalService.getBasic(this.uid)
      .subscribe(data => {
        this.basic = data;

        // 波特率
        for (let i = 0; i < this.baudRateList.length; i++) {
          if (this.basic.baud_rate === this.baudRateList[i].value) {
            this.baud_rate = this.baudRateList[i].name;
            break;
          }
        }

        // 心跳包频率
        for (let i = 0; i < this.heartbeatList.length; i++) {
          if (this.basic.heart_beat === this.heartbeatList[i].value) {
            this.heart_beat = this.heartbeatList[i].name;
            break;
          }
        }
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



  // 数据流量查询模态框
  flowInfo() {
    const that = this;
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
    const title = '确认要删除此终端吗？';
    const subtitle = '';
    this.creatModal(title, subtitle, () => {
      this.checkBatch( [this.uid]);
    });
  }


  // 下发
  issued() {
    let that = this;
    const title = '确认要下发此终端吗？';
    const subtitle = '';
    let post = {
      data: this.uid
    };

    this.creatModal(title, subtitle, () => {
      this.isSpinning = true;
      this.terminalService.issued(this.uid)
        .subscribe(val => {
          this.isSpinning = false;
          Swal(
            '操作成功！',
            '',
            'success'
          );
          that.getBasic();
          that.getOperate();
          // that.router.navigate(['/admin/ad/terminal/list']);
        }, err => {
          this.isSpinning = false;
          Swal(
            err.message || err,
            '',
            'error'
          );
          that.getBasic();
          that.getOperate();
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
    const that = this;
    const post = {
      data: checked
    };

    this.terminalService.deleteData(post)
      .subscribe(val => {
        Swal(
          '操作成功！',
          '',
          'success'
        );
        that.router.navigate(['/admin/formal/terminal/list']);
      }, err => {
        Swal(
          err.message || err,
          '',
          'error'
        );
      });
  }



  goBack() {
    window.history.go(-1);
  }

}
