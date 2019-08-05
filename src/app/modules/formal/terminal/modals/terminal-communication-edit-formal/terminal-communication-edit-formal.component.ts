import { Component, OnInit } from '@angular/core';
import {TerminalService} from "../../../../../shared/terminal.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-terminal-communication-edit-formal',
  templateUrl: './terminal-communication-edit-formal.component.html',
  styleUrls: ['./terminal-communication-edit-formal.component.css']
})
export class TerminalCommunicationEditFormalComponent implements OnInit {

  public baudRate; // 波特率
  public dataBit; // 数据位
  public stopBit; // 停止位
  public parity; // 校验位
  public heartbeat; // 心跳包频率
  public slave; // 从机地址
  public correspond; // 通信接口地址
  public dataType; // 包类型

  public baudRateList; // 波特率下拉列表
  public dataBitList; // 数据位下拉列表
  public stopBitList; // 停止位下拉列表
  public parityList; // 校验位下拉列表
  public heartbeatList; // 心跳包频率下拉列表
  public slaveList; // 从机地址下拉列表
  public correspondList; // 通信接口地址下拉列表
  public dataTypeList; // 包类型下拉列表

  constructor(public activeModal: NgbActiveModal,
              private terminalService: TerminalService) { }

  ngOnInit() {
    this.getLists();
  }


  // 获取下拉列表
  getLists() {

    // 波特率
    this.terminalService.getBaudRate()
      .subscribe(data => {
        this.baudRateList = data;
      });

    // 通信接口地址
    this.terminalService.getCorrespond()
      .subscribe(data => {
        this.correspondList = data;
      });

    // 数据位
    this.terminalService.getDataBit()
      .subscribe(data => {
        this.dataBitList = data;
      });

    // 心跳包频率
    this.terminalService.getHeartbeat()
      .subscribe(data => {
        this.heartbeatList = data;
      });

    // 校验位
    this.terminalService.getParity()
      .subscribe(data => {
        this.parityList = data;
      });

    // 从机地址
    this.terminalService.getSlave()
      .subscribe(data => {
        this.slaveList = data;
      });

    // 停止位
    this.terminalService.getStopBit()
      .subscribe(data => {
        this.stopBitList = data;
      });



    // 包类型
    this.terminalService.getDataType()
      .subscribe(data => {
        this.dataTypeList = data;
      });
  }



  // 提交
  save() {
    const that = this;
    const post = {

    };
    /*this.terminalService.addDataF(post)
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
      });*/
  }


}
