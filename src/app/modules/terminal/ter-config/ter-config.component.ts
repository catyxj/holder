import {Component, Input, OnInit} from '@angular/core';
import {switchMap} from 'rxjs/internal/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {TerminalService} from "../../../shared/terminal.service";
import {AlarmRuleComponent} from "../alarm-rule/alarm-rule.component";
import {NzModalService} from "ng-zorro-antd";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RangeConfigComponent} from "../range-config/range-config.component";

@Component({
  selector: 'app-ter-config',
  templateUrl: './ter-config.component.html',
  styleUrls: ['./ter-config.component.css']
})
export class TerConfigComponent implements OnInit {

  public code;
  public analogueList = [];
  public switchList = [];
  public rangeList = [];
  public infomation;
  public compares;
  public funcs;
  public funcs1;
  public funcs2;
  public bytes;
  public priorities = [];
  public communiInterfaces;
  public dataBits;
  public heartbeats;
  public checkDigits;
  public subAdrs;
  public stopBits;
  public BaudRates;


  constructor(private route: ActivatedRoute,
              private terminalService: TerminalService,
              private modalService: NgbModal) { }

  ngOnInit() {

    this.code = this.route.snapshot.paramMap.get('code');

    this.getTerminal();
    this.initLists();
    this.initPriorities();
  }

  initPriorities() {
    for ( let i = 0; i < 24; i++) {
      this.priorities.push(i);
    }
  }

  // 获取终端信息
  getTerminal() {
    this.analogueList = [
      {
        ChannelNumber: 1,
        Parameter: {
          Name: '',
          Scale: null
        },
        alarm: [],
        Func: 0,
        Byte: 0,
        Modbus: null,
        Status: -1,
        SequenceNumber: 0
      }
    ];

    this.switchList = [
      {
        ChannelNumber: 1,
        Parameter: {
          Name: '',
        },
        alarm: [],
        Func: 0,
        Modbus: null,
        BitAddress: null,
        Status: -1,
        SequenceNumber: 0
      }
    ];

    this.rangeList = [
      {
        ChannelNumber: 1,
        Parameter: {
          Name: '',
        },
        alarm: [],
        Ranges: [],
        Func: 0,
        Byte: 0,
        Modbus: null,
        Status: -1,
        SequenceNumber: 0
      }
    ];

    this.infomation = {
      BaudRate: 0,
      dataBit: 0,
      stopBit: 0,
      checkDigit: 0,
      communiInterface: 0,
      subAdr: 0,
      heartbeat: 0
    };

  }

  // 初始化下拉列表
  initLists() {
    // 功能码
      this.terminalService.getFuncode()
        .subscribe( fun => {
          this.funcs = fun;
          this.funcs2 = [
            {Id: 1, Name: '01', Value: 1},
            {Id: 2, Name: '02', Value: 2},
            {Id: 3, Name: '03', Value: 3},
            {Id: 99, Name: 'None', Value: 99}
          ];
          this.funcs1 = [
            {Id: 3, Name: '03', Value: 3},
            {Id: 4, Name: '04', Value: 4}

          ];
        });


    // 高低字节
      this.terminalService.getByte()
        .subscribe(byte => {
          this.bytes = byte;
        });


    // 通信接口地址
    this.terminalService.getCorrespond()
      .subscribe(data => {
        this.communiInterfaces = data;
      });

    // 数据位
    this.terminalService.getDataBit()
      .subscribe(data => {
        this.dataBits = data;
      });

    // 心跳包频率
    this.terminalService.getHeartbeat()
      .subscribe(data => {
        this.heartbeats = data;
      });

    // 校验位
    this.terminalService.getParity()
      .subscribe(data => {
        this.checkDigits = data;
      });

    // 从机地址
    this.terminalService.getSlave()
      .subscribe(data => {
        this.subAdrs = data;
      });

    // 停止位
    this.terminalService.getStopBit()
      .subscribe(data => {
        this.stopBits = data;
      });

    // 波特率
    this.terminalService.getBaudRate()
      .subscribe(data => {
        this.BaudRates = data;
      });


  }




  // 添加模拟量
  addAnalogue() {
    let n = this.analogueList.length;
    this.analogueList.push({
      ChannelNumber: n + 1,
      Parameter: {
        Name: '',
        Scale: null
      },
      alarm: [],
      Func: null,
      Byte: null,
      Modbus: null,
      Status: -1,
      SequenceNumber: 0
    });
  }

  // 添加开关量
  addSwitch() {
    let n = this.switchList.length;
    this.switchList.push({
      ChannelNumber: n + 1,
      Parameter: {
        Name: '',
      },
      alarm: [],
      Func: 0,
      Modbus: null,
      BitAddress: null,
      Status: -1,
      SequenceNumber: 0
    });
  }

  // 添加状态量
  addRange() {
    let n = this.rangeList.length;
    this.rangeList.push({
      ChannelNumber: n + 1,
      Parameter: {
        Name: '',
      },
      alarm: [],
      Ranges: [],
      Func: null,
      Byte: null,
      Modbus: null,
      Status: -1,
      SequenceNumber: 0
    });
  }

  // 移除模拟量
  removeAnalogue(index) {
    this.analogueList.splice(index, 1);
  }

  // 移除开关量
  removeSwitch(index) {
    this.switchList.splice(index, 1);
  }

  // 移除状态量
  removeRange(index) {
    this.rangeList.splice(index, 1);
  }


  // 参数名称改变
  dataChanged(data) {
    if (!data.Parameter.Name) {
      data.Parameter = {};
      data.Status = -1;
      data.SwitchStatus = 0;
      data.Ranges = null;
      data.Func = null;
      data.Byte = null;
      data.Modbus = null;
    } else {
      if (!data.Status || data.Status === -1) {
        data.Status = 0;
      }

      if (!data.SwitchStatus || data.SwitchStatus === 0) {
        data.SwitchStatus = 1;
      }

    }
  }

  // 设置位置
  setStatus(data, status, sn?) {
    data.Status = status;
    if (status === 1) {
      data.SequenceNumber = sn;
    } else {
      data.SequenceNumber = -1;
    }
  }

  // 添加告警规则
  addAlarmRule(data) {
    const modalRef = this.modalService.open(AlarmRuleComponent, {size: 'lg'});
    modalRef.componentInstance.currentData = data;
    modalRef.result.then((result) => {
      data.alarm = result;
      console.log(result, data);
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }


  // 状态设置
  setSwitchStatus(outerIndex, status) {
    this.switchList[outerIndex].SwitchStatus = status;
  }

  openRange(data) {
    const modalRef = this.modalService.open(RangeConfigComponent, {size: 'lg'});
    modalRef.componentInstance.currentData = data;
    modalRef.result.then((result) => {
      data.Ranges = result;
      console.log(result, data);
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }



  fCodeChange (data) {
    if (data.Func === '1' || data.Func === '2') {
      data.BitAddress = 1;
    }
  }


  save() {

    let infomation = {
      BaudRate: parseInt(this.infomation.BaudRate),
      dataBit: parseInt(this.infomation.dataBit),
      stopBit: parseInt(this.infomation.stopBit),
      checkDigit: parseInt(this.infomation.checkDigit),
      communiInterface: parseInt(this.infomation.communiInterface),
      subAdr: parseInt(this.infomation.subAdr),
      heartbeat: parseInt(this.infomation.heartbeat)
    };

    let data = {
      Chan: {
        Analogue: this.analogueList,
        Switch: this.switchList,
        Range: this.rangeList
      },
      Param: infomation,
      Code: this.code
    };
    this.terminalService.save(data)
      .subscribe(val => {
        alert('保存成功');
      });

  }


}
