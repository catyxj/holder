import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TerminalService} from "../../../../../shared/terminal.service";
import {TemplateService} from "../../../../../shared/template.service";

@Component({
  selector: 'app-template-add-cmt',
  templateUrl: './template-add-cmt.component.html',
  styleUrls: ['./template-add-cmt.component.css']
})
export class TemplateAddCmtComponent implements OnInit {
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


  @Output()
  next = new EventEmitter();
  @Input()
  uid;

  constructor(private terminalService: TerminalService,
              private templateService: TemplateService) { }

  ngOnInit() {
    if (this.uid) {
      console.log(this.uid);
    }
    this.getLists();
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
        this.stopBitList = data.stop_bit; // 停止位
        this.dataTypeList = data.data_type; // 包类型
      });

  }


  pre() {
    this.next.emit(-1);
  }

  save() {
    let that = this;
    let post;
    /*post = {
      baud_rate: parseInt(this.baudRate),
      data_bit: parseInt(this.dataBit),
      stop_bit: parseInt(this.stopBit),
      parity_bit: parseInt(this.parity),
      heart_beat: parseInt(this.heartbeat),
      cmt_type: parseInt(this.correspond),
      data_type: parseInt(this.dataType)
    };*/
    console.log(post);
    this.next.emit(1);

    /*this.templateService.updateBasic(post)
      .subscribe(val => {
        Swal(
          '操作成功！',
          '',
          'success'
        );
        this.next.emit(1);
      }, err => {
        Swal(
          err.message,
          '',
          'error'
        );
      });*/


  }

}
