import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TerminalService} from "../../../shared/terminal.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NzModalService} from "ng-zorro-antd";
import {RangeConfigComponent} from "../../terminal/range-config/range-config.component";
import {AlarmRuleComponent} from "../../terminal/alarm-rule/alarm-rule.component";
import {TemplateService} from "../../../shared/template.service";
import Swal from 'sweetalert2';
import {AddTemplateComponent} from "../../terminal/add-template/add-template.component";

@Component({
  selector: 'app-edit-temp',
  templateUrl: './edit-temp.component.html',
  styleUrls: ['./edit-temp.component.css']
})
export class EditTempComponent implements OnInit {

  public name;
  private uid;
  public analogueList = [];
  public switchList = [];
  public rangeList = [];
  public infomation;
  public compares;
  public funcs;
  public funcs1;
  public funcs2;
  public bytes;
  public priorities1 = [];
  public priorities2 = [];
  public priorities3 = [];
  public communiInterfaces;
  public dataBits;
  public heartbeats;
  public checkDigits;
  public subAdrs;
  public stopBits;
  public BaudRates;
  public editName;
  public isSpinning = false;

  constructor(private route: ActivatedRoute,
              private terminalService: TerminalService,
              private templateService: TemplateService,
              private modalService: NgbModal,
              private nzmodalService: NzModalService) { }

  ngOnInit() {
    this.editName = false;
    this.name = this.route.snapshot.paramMap.get('name');
    this.uid  = this.route.snapshot.paramMap.get('uid');
    this.infomation = {
      BaudRate: 0, // 波特率
      dataBit: 0,  // 数据位
      stopBit: 0,  // 停止位
      checkDigit: 0, // 校验位
      communiInterface: 0, // 通信接口地址
      subAdr: 0,  // 从机地址
      heartbeat: 0  // 心跳包频率
    };
    this.getTemplate();
    this.initLists();
    this.initPriorities();
  }

  initPriorities() {
    for ( let i = 0; i < 24; i++) {
      this.priorities1.push(i);
    }
    for ( let i = 0; i < 48; i++) {
      this.priorities2.push(i);
    }
    for ( let i = 0; i < 12; i++) {
      this.priorities3.push(i);
    }
  }

  // 获取模板信息
  getTemplate() {

    this.templateService.getChannel(this.uid)
      .subscribe( data => {
        let channels = data.channelConfigs;
        let information = data.communication;

        //
        for (let i = 0; i < channels.length; i++) {
          let chan = channels[i];

          if (chan.ChannelType === 1) {
            this.analogueList.push({
              ChannelNumber: chan.ChannelNumber,
              Parameter: {
                Name: chan.Name,
                Scale: chan.Scale,
                Unit: chan.Unit
              },
              alarm: chan.AlarmRule,
              Func: chan.FunctionCode ? chan.FunctionCode.Id : 0,
              Byte: chan.Byte ? chan.Byte.Id : 0,
              Modbus: chan.Modbus,
              Status: chan.Status,
              SequenceNumber: chan.SequenceNumber
            });
          }

          if (chan.ChannelType === 3) {
            this.switchList.push({
              ChannelNumber: chan.ChannelNumber,
              Parameter: {
                Name: chan.Name,
              },
              alarm: chan.AlarmRule,
              Func: chan.FunctionCode ? chan.FunctionCode.Id : 0,
              Modbus: chan.Modbus,
              BitAddress: chan.BitAddress,
              Status: chan.Status,
              SwitchStatus: chan.SwitchStatus,
              SequenceNumber: chan.SequenceNumber
            });
          }

          if (chan.ChannelType === 5) {
            this.rangeList.push({
              ChannelNumber: chan.ChannelNumber,
              Parameter: {
                Name: chan.Name,
              },
              alarm: chan.AlarmRule,
              Ranges: chan.Ranges,
              Func: chan.FunctionCode ? chan.FunctionCode.Id : 0,
              Byte: chan.Byte ? chan.Byte.Id : 0,
              Modbus: chan.Modbus,
              Status: chan.Status,
              SequenceNumber: chan.SequenceNumber
            });
          }
        }

        if (this.analogueList.length <= 0) {
          this.analogueList = [
            {
              ChannelNumber: 1,
              Parameter: {
                Name: '',
                Scale: null,
                Unit: null
              },
              alarm: [],
              Func: 0,
              Byte: 0,
              Modbus: null,
              Status: -1,
              SequenceNumber: -1
            }
          ];
        }

        if (this.switchList.length <= 0) {
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
              SwitchStatus: null,
              SequenceNumber: -1
            }
          ];
        }

        if (this.rangeList.length <= 0) {
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
              SequenceNumber: -1
            }
          ];
        }

        // 通信参数
        this.infomation = {
          BaudRate: information.BaudRate ? information.BaudRate.Id : 0, // 波特率
          dataBit: information.DataBit ? information.DataBit.Id : 0,  // 数据位
          stopBit: information.StopBit ? information.StopBit.Id : 0,  // 停止位
          checkDigit: information.ParityBit ? information.ParityBit.Id : 0, // 校验位
          communiInterface: information.CorrespondType ? information.CorrespondType.Id : 0, // 通信接口地址
          subAdr: information.SlaveAddress ? information.SlaveAddress.Id : 0,  // 从机地址
          heartbeat: information.HeartBeat ? information.HeartBeat.Id : 0  // 心跳包频率
        };


      });

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
        Scale: null,
        Unit: null
      },
      alarm: [],
      Func: null,
      Byte: null,
      Modbus: null,
      Status: -1,
      SequenceNumber: -1
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
      SequenceNumber: -1
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
      SequenceNumber: -1
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
      data.Ranges = [];
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
      // console.log(result, data);
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
      // console.log(result, data);
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

    // 模拟通道
    let analogueList = [];
    let aNumList = [];
    for (let i = 0; i < this.analogueList.length; i++) {
      if (this.analogueList[i].Parameter.Name) {
        if (this.analogueList[i].ChannelNumber > 24) {
          this.nzmodalService.error({
            nzTitle: '通道配置更新失败',
            nzContent: '模拟通道不能超过24'
          });
          return false;
        }
        aNumList.push(this.analogueList[i].ChannelNumber);
        if (!this.analogueList[i].Func || !this.analogueList[i].Byte || !this.analogueList[i].Modbus || !this.analogueList[i].Parameter.Scale) {
          this.nzmodalService.error({
            nzTitle: '通道配置更新失败',
            nzContent: `模拟通道配置信息不全 ，参数不能为0 [ ${i} ]`
          });
          return false;
        }
        if (parseInt(this.analogueList[i].Func) === 3) {
          if (this.analogueList[i].Modbus <= 40000 || this.analogueList[i].Modbus >= 50000) {
            this.nzmodalService.error({
              nzTitle: 'MODBUS地址错误',
              nzContent: '功能码为03，MODBUS地址范围40001-49999'
            });
            return false;
          }
        }
        if (parseInt(this.analogueList[i].Func) === 4) {
          if (this.analogueList[i].Modbus <= 30000 || this.analogueList[i].Modbus >= 40000) {
            this.nzmodalService.error({
              nzTitle: 'MODBUS地址错误',
              nzContent: '功能码为04，MODBUS地址范围30001-39999'
            });
            return false;
          }
        }
        analogueList.push({
          ChannelNumber: this.analogueList[i].ChannelNumber,
          Name: this.analogueList[i].Parameter.Name,
          Scale: this.analogueList[i].Parameter.Scale,
          Unit: this.analogueList[i].Parameter.Unit,
          Alarm: this.analogueList[i].alarm,
          Func: parseInt(this.analogueList[i].Func),
          Byte: parseInt(this.analogueList[i].Byte),
          Modbus: this.analogueList[i].Modbus,
          Status: this.analogueList[i].Status,
          SequenceNumber: this.analogueList[i].SequenceNumber
        });
      }
    }

    aNumList.sort();
    for (let i = 0; i < aNumList.length; i++) {
      if (aNumList[i] === aNumList[i + 1]) {
        this.nzmodalService.error({
          nzTitle: `模拟量通道[ ${aNumList[i]} ]重复配置`,
          nzContent: '模拟量通道数不能相同'
        });
        return false;
      }
    }


    // 开关通道
    let switchList = [];
    let sNumList = [];
    for (let i = 0; i < this.switchList.length; i++) {
      if (this.switchList[i].Parameter.Name) {
        if (this.switchList[i].ChannelNumber > 48) {
          this.nzmodalService.error({
            nzTitle: '通道配置更新失败',
            nzContent: '开关通道不能超过48'
          });
          return false;
        }
        sNumList.push(this.switchList[i].ChannelNumber);
        if ( (parseInt(this.switchList[i].Func) !== 99) && (!this.switchList[i].Func || !this.switchList[i].BitAddress || !this.switchList[i].Modbus)) {

          this.nzmodalService.error({
            nzTitle: '通道配置更新失败',
            nzContent: `开关通道配置信息不全 ，参数不能为0 [${i}]`
          });
          return false;
        }
        if ( parseInt(this.switchList[i].Func) === 1) {
          if (this.switchList[i].Modbus < 1 || this.switchList[i].Modbus >= 10000) {
            this.nzmodalService.error({
              nzTitle: '开关通道MODBUS地址错误',
              nzContent: `功能码为01，MODBUS地址范围00001-09999`
            });
            return false;
          }
          if (this.switchList[i].BitAddress !== 1) {
            this.nzmodalService.error({
              nzTitle: '开关通道位地址错误',
              nzContent: '功能码为01，对应位地址为1'
            });
            return false;
          }
        }
        if (parseInt(this.switchList[i].Func) === 2) {
          if (this.switchList[i].Modbus <= 10000 || this.switchList[i].Modbus >= 20000) {
            this.nzmodalService.error({
              nzTitle: '开关通道MODBUS地址错误',
              nzContent: '功能码为02，MODBUS地址范围10001-19999'
            });
            return false;
          }
          if (this.switchList[i].BitAddress !== 1) {
            this.nzmodalService.error({
              nzTitle: '开关通道位地址错误',
              nzContent: '功能码为02，对应位地址为1'
            });
            return false;
          }
        }
        if (parseInt(this.switchList[i].Func) === 3) {
          if (this.switchList[i].Modbus <= 40000 || this.switchList[i].Modbus >= 50000) {
            this.nzmodalService.error({
              nzTitle: '开关通道MODBUS地址错，请修改',
              nzContent: '功能码为03，MODBUS地址范围40001-49999'
            });
            return false;
          }
          if (this.switchList[i].BitAddress < 1 || this.switchList[i].BitAddress > 16) {
            this.nzmodalService.error({
              nzTitle: '位地址错误',
              nzContent: '功能码为03，对应位地址范围为1-16'
            });
            return false;
          }
        }
        switchList.push({
          ChannelNumber: this.switchList[i].ChannelNumber,
          Name: this.switchList[i].Parameter.Name,
          Alarm: this.switchList[i].alarm,
          Func: parseInt(this.switchList[i].Func),
          Modbus: this.switchList[i].Modbus,
          BitAddress: this.switchList[i].BitAddress,
          Status: this.switchList[i].Status,
          SwitchStatus: this.switchList[i].SwitchStatus,
          SequenceNumber: this.switchList[i].SequenceNumber
        });
      }
    }
    sNumList.sort();
    for (let i = 0; i < sNumList.length; i++) {
      if (sNumList[i] === sNumList[i + 1]) {
        this.nzmodalService.error({
          nzTitle: `开关量通道[ ${sNumList[i]} ]重复配置`,
          nzContent: '开关量通道数不能相同'
        });
        return false;
      }
    }


    // 状态通道
    let rangeList = [];
    let rNumList = [];
    for (let i = 0; i < this.rangeList.length; i++) {
      if (this.rangeList[i].Parameter.Name) {
        if (this.rangeList[i].ChannelNumber > 12) {
          this.nzmodalService.error({
            nzTitle: '通道配置更新失败',
            nzContent: '状态通道不能超过12'
          });
          return false;
        }
        rNumList.push(this.rangeList[i].ChannelNumber);
        if (!this.rangeList[i].Func || !this.rangeList[i].Byte || !this.rangeList[i].Modbus) {
          this.nzmodalService.error({
            nzTitle: '通道配置更新失败',
            nzContent: `状态通道[${this.rangeList[i].ChannelNumber}]配置信息不全 ，参数不能为0 `
          });
          return false;
        }
        if ( parseInt(this.rangeList[i].Func) === 3) {
          if (this.rangeList[i].Modbus <= 40000 || this.rangeList[i].Modbus >= 50000) {
            this.nzmodalService.error({
              nzTitle: 'MODBUS地址错误',
              nzContent: '功能码为03，MODBUS地址范围40001-49999'
            });
            return false;
          }
        }
        if (parseInt(this.rangeList[i].Func) === 4) {
          if (this.rangeList[i].Modbus <= 30000 || this.rangeList[i].Modbus >= 40000) {
            this.nzmodalService.error({
              nzTitle: 'MODBUS地址错误',
              nzContent: '功能码为04，MODBUS地址范围30001-39999'
            });
            return false;
          }
        }

        if (this.rangeList[i].Ranges.length <= 0) {
          this.nzmodalService.error({
            nzTitle: '状态量通道配置错误',
            nzContent: '已配置的状态量通道，需要完成其状态值的配置才可提交'
          });
          return;
        }

        rangeList.push({
          ChannelNumber: this.rangeList[i].ChannelNumber,
          Name: this.rangeList[i].Parameter.Name,
          Alarm: this.rangeList[i].alarm,
          Func: parseInt(this.rangeList[i].Func),
          Byte: parseInt(this.rangeList[i].Byte),
          Modbus: this.rangeList[i].Modbus,
          Status: this.rangeList[i].Status,
          Ranges: this.rangeList[i].Ranges,
          SequenceNumber: this.rangeList[i].SequenceNumber
        });
      }
    }
    rNumList.sort();
    for (let i = 0; i < rNumList.length; i++) {
      if (rNumList[i] === rNumList[i + 1]) {
        this.nzmodalService.error({
          nzTitle: `状态量通道[${rNumList[i]}]重复配置`,
          nzContent: '状态量通道数不能相同'
        });
        return false;
      }
    }



    // 通信参数
    if (!this.infomation.BaudRate || !this.infomation.dataBit || !this.infomation.stopBit || !this.infomation.checkDigit || !this.infomation.communiInterface || !this.infomation.subAdr || !this.infomation.heartbeat) {
      this.nzmodalService.error({
        nzTitle: '通道配置更新失败',
        nzContent: '通信参数不能为空'
      });
      return false;
    }

    console.log(this.infomation);
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
      Analogue: analogueList,
      Switch: switchList,
      Range: rangeList,
      Param: infomation,
      Name: this.name,
      Uid: this.uid
    };
    // this.isSpinning = true;

    // 打开模态框
    const modalRef = this.modalService.open(AddTemplateComponent);
    modalRef.componentInstance.currentData = data;
    modalRef.result.then((result) => {
      console.log(result);

    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });

    /*this.templateService.save(data)
      .subscribe(val => {
        this.isSpinning = false;
        Swal(
          '保存成功！',
          '',
          'success'
        );
      }, err => {
        this.isSpinning = false;
        Swal(
          '保存失败！',
          err,
          'error'
        );
      });*/

  }

}
