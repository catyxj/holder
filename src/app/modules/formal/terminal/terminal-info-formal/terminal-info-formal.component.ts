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
  public basic;
  public operate;
  tplModal: NzModalRef;
  public listPage;

  constructor(private terminalService: TerminalService,
              private route: ActivatedRoute,
              public router: Router,
              private modalService: NgbModal,
              private nzModal: NzModalService) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.listPage = this.route.snapshot.paramMap.get('page');

    /*this.basic = {
      terminal_code: '122334',
      fw_ver: 12,
      sms_code: 'asdfasdf',
      status: 4
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
      data: [this.uid]
    };
    this.creatModal(title, subtitle, () => {
      this.terminalService.issued(post)
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
    });
  }


  creatModal(title, subtitle, call) {
    const that = this;
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
        that.router.navigate(['/admin/ad/terminal/list']);
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
