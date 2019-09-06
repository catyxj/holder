import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TerminalService} from "../../../../shared/terminal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TemplateService} from "../../../../shared/template.service";
import {TemplateCmtEditFComponent} from "../modals/template-cmt-edit-f/template-cmt-edit-f.component";
import {TemplateBasicEditFComponent} from "../modals/template-basic-edit-f/template-basic-edit-f.component";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-template-config-formal',
  templateUrl: './template-config-formal.component.html',
  styleUrls: ['./template-config-formal.component.css']
})
export class TemplateConfigFormalComponent implements OnInit {
  public uid;
  public auth;
  public basic;
  public communication;
  public communicateInfo = {baud_rate: '', cmt_type: '', data_bit: '', data_type: '', stop_bit: '', heart_beat: '', parity_bit: '' };
  public channels;
  public zutai;
  public img = 'assets/images/photo.png';

  public baudRateList = []; // 波特率下拉列表
  public dataBitList = []; // 数据位下拉列表
  public stopBitList = []; // 停止位下拉列表
  public parityList = []; // 校验位下拉列表
  public heartbeatList = []; // 心跳包频率下拉列表
  public correspondList = []; // 通信接口地址下拉列表
  public dataTypeList = []; // 包类型下拉列表

  public listPage;
  tplModal: NzModalRef;

  constructor(private modalService: NgbModal,
              private terminalService: TerminalService,
              private templateService: TemplateService,
              private route: ActivatedRoute,
              private nzModal: NzModalService,
              private router: Router) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.listPage = this.route.snapshot.paramMap.get('page');
    this.auth = JSON.parse(localStorage.getItem('auth'));
    this.getCmtList();
    this.getBasic();
    this.getChannel();
    this.getZT();
  }



  // 获取通信参数下拉列表
  getCmtList() {
    this.terminalService.getCmtParam()
      .subscribe(data => {
        this.baudRateList = data.baud_rate;  // 波特率
        this.correspondList = data.cmt_inf; // 通信接口地址
        this.dataBitList = data.data_bit; // 数据位
        this.heartbeatList = data.heart_beat;  // 心跳包频率
        this.parityList = data.parity_bit; // 校验位
        this.stopBitList = data.stop_bit; // 停止位
        this.dataTypeList = data.data_type; // 包类型
        this.getCommunication();
      });
  }

  // 获取通信参数
  getCommunication() {
    this.templateService.getCmt(this.uid)
      .subscribe(data => {
        this.communication = data;


        // 波特率
        for (let i = 0; i < this.baudRateList.length; i++) {
          if (this.communication.baud_rate === this.baudRateList[i].value) {
            this.communicateInfo.baud_rate = this.baudRateList[i].name;
            break;
          }
        }

        // 通信接口地址
        for (let i = 0; i < this.correspondList.length; i++) {
          if (this.communication.cmt_type === this.correspondList[i].value) {
            this.communicateInfo.cmt_type = this.correspondList[i].name;
            break;
          }
        }

        // 数据位
        for (let i = 0; i < this.dataBitList.length; i++) {
          if (this.communication.data_bit === this.dataBitList[i].value) {
            this.communicateInfo.data_bit = this.dataBitList[i].name;
            break;
          }
        }

        // 心跳包频率
        for (let i = 0; i < this.heartbeatList.length; i++) {
          if (this.communication.heart_beat === this.heartbeatList[i].value) {
            this.communicateInfo.heart_beat = this.heartbeatList[i].name;
            break;
          }
        }

        // 校验位
        for (let i = 0; i < this.parityList.length; i++) {
          if (this.communication.parity_bit === this.parityList[i].value) {
            this.communicateInfo.parity_bit = this.parityList[i].name;
            break;
          }
        }

        // 停止位
        for (let i = 0; i < this.stopBitList.length; i++) {
          if (this.communication.stop_bit === this.stopBitList[i].value) {
            this.communicateInfo.stop_bit = this.stopBitList[i].name;
            break;
          }
        }

        // 包类型
        for (let i = 0; i < this.dataTypeList.length; i++) {
          if (this.communication.data_type === this.dataTypeList[i].value) {
            this.communicateInfo.data_type = this.dataTypeList[i].name;
            break;
          }
        }


      }, err => {

      });
  }


  // 获取通道信息
  getChannel() {
    this.templateService.getChannelBrief(this.uid)
      .subscribe(data => {
        this.channels = data;
      }, err => {

      });
  }

  // 获取组态信息
  getZT() {
    this.templateService.getzZTBrief(this.uid)
      .subscribe(data => {
        this.zutai = data;
      }, err => {

      });
  }

  // 获取模板基本信息
  getBasic() {
    this.templateService.getEpt(this.uid)
      .subscribe(data => {
        this.basic = data;
        if (this.basic && this.basic.ept_img) {
          this.img = this.basic.ept_img;
        }
      }, err => {

      });
  }


  // 刷新
  refresh() {
    this.getCommunication();
    this.getBasic();
    this.getChannel();
    this.getZT();
  }



  // 设置通信参数
  communicationSet() {
    const modalRef = this.modalService.open(TemplateCmtEditFComponent, {windowClass: 'modal_m', centered: true});
    modalRef.componentInstance.currentData = this.communication;
    modalRef.componentInstance.uid = this.uid;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        this.getCommunication();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }

  // 设置基础信息
  basicSet() {
    const modalRef = this.modalService.open(TemplateBasicEditFComponent, {windowClass: 'modal_m', centered: true});
    modalRef.componentInstance.currentData = this.basic;
    modalRef.componentInstance.uid = this.uid;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        this.getBasic();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }

  // 删除
  deleteData() {
    let that = this;
    const title = '确认要删除此模板吗？';
    const subtitle = '';
    this.creatModal(title, subtitle, () => {
      const post = {
        data: [this.uid]
      };

      this.templateService.deleteData(post)
        .subscribe(val => {
          Swal(
            '操作成功！',
            '',
            'success'
          );
          that.router.navigate(['/admin/ad/template/list']);
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



  goBack() {
    window.history.go(-1);
  }

}
