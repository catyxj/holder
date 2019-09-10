import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TerminalService} from "../../../../../shared/terminal.service";
import Swal from 'sweetalert2';
import {TemplateService} from "../../../../../shared/template.service";

@Component({
  selector: 'app-template-cmt-edit-f',
  templateUrl: './template-cmt-edit-f.component.html',
  styleUrls: ['./template-cmt-edit-f.component.css']
})
export class TemplateCmtEditFComponent implements OnInit {
  @Input()
  currentData;
  @Input()
  uid;

  public baudRate; // 波特率
  public dataBit; // 数据位
  public stopBit; // 停止位
  public parity; // 校验位
  public heartbeat; // 心跳包频率
  public correspond; // 通信接口地址
  public dataType; // 包类型

  public baudRateList = []; // 波特率下拉列表
  public dataBitList = []; // 数据位下拉列表
  public stopBitList = []; // 停止位下拉列表
  public parityList = []; // 校验位下拉列表
  public heartbeatList = []; // 心跳包频率下拉列表
  public correspondList = []; // 通信接口地址下拉列表
  public dataTypeList = []; // 包类型下拉列表

  constructor(public activeModal: NgbActiveModal,
              private terminalService: TerminalService,
              private templateService: TemplateService) { }

  ngOnInit() {
    this.getLists();
    this.baudRate = this.currentData.baud_rate;
    this.dataBit = this.currentData.data_bit;
    this.stopBit = this.currentData.stop_bit;
    this.parity = this.currentData.parity_bit;
    this.heartbeat = this.currentData.heart_beat;
    this.correspond = this.currentData.cmt_type;
    this.dataType = this.currentData.data_type;
  }


  // 获取下拉列表
  getLists() {

    this.terminalService.getCmtParam()
      .subscribe(data => {
        this.baudRateList = data.baud_rate;  // 波特率
        this.correspondList = data.cmt_inf; // 通信接口地址
        this.dataBitList = data.data_bit; // 数据位
        this.heartbeatList = data.heart_beat;  // 心跳包频率
        this.parityList = data.parity_bit; // 校验位
        // this.slaveList = data; // 从机地址
        this.stopBitList = data.stop_bit; // 停止位
        this.dataTypeList = data.data_type; // 包类型
      });

  }


  // 提交
  save() {
    const that = this;
    const post = {
      uid: this.uid,
      baud_rate: parseInt(this.baudRate),
      data_bit: parseInt(this.dataBit),
      stop_bit: parseInt(this.stopBit),
      parity_bit: parseInt(this.parity),
      heart_beat: parseInt(this.heartbeat),
      cmt_type: parseInt(this.correspond),
      data_type: parseInt(this.dataType)
    };
    this.templateService.addCmt(post)
      .subscribe(val => {
        Swal(
          '提交成功',
          '',
          'success'
        );
        that.activeModal.close('ok');
      }, err => {
        Swal(
          err.message || err,
          '',
          'error'
        );
      });
  }


}
