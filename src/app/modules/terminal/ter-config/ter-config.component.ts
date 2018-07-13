import {Component, Input, OnInit} from '@angular/core';
import {switchMap} from 'rxjs/internal/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {TerminalService} from "../../../shared/terminal.service";
import {AlarmRuleComponent} from "../alarm-rule/alarm-rule.component";
import {NzModalService} from "ng-zorro-antd";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-ter-config',
  templateUrl: './ter-config.component.html',
  styleUrls: ['./ter-config.component.css']
})
export class TerConfigComponent implements OnInit {

  public code;
  public analogueList = [];
  public switchList = [];
  public compares;
  public funcs;
  public bytes;
  public priorities = [];


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

  }

  // 初始化下拉列表
  initLists() {
    // 功能码
      this.terminalService.getFuncode()
        .subscribe( fun => {
          this.funcs = fun;
        });


    // 高低字节
      this.terminalService.getByte()
        .subscribe(byte => {
          this.bytes = byte;
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

  // 移除模拟量
  removeAnalogue(index) {
    this.analogueList.splice(index, 1);
  }

  // 移除模拟量
  removeSwitch(index) {
    this.switchList.splice(index, 1);
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
    console.log($scope.switchList);
  }

  fCodeChange (data) {
    if (data.Func === '1' || data.Func === '2') {
      data.BitAddress = 1;
    }
  };



}
