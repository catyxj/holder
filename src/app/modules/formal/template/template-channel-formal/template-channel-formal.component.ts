import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TerminalService} from "../../../../shared/terminal.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NzModalService} from "ng-zorro-antd/modal";
import {AlarmRuleComponent} from "../../terminal/modals/alarm-rule/alarm-rule.component";
import {RangeConfigComponent} from "../../terminal/modals/range-config/range-config.component";
import Swal from 'sweetalert2';
import {TemplateService} from "../../../../shared/template.service";

@Component({
  selector: 'app-template-channel-formal',
  templateUrl: './template-channel-formal.component.html',
  styleUrls: ['./template-channel-formal.component.css']
})
export class TemplateChannelFormalComponent implements OnInit {
  public uid;
  public code;
  public name;
  public basic;
  public analogueList = [];
  public switchList = [];
  public rangeList = [];
  public funcs;
  public bytes;
  public writeRule;
  public priorities1 = [];
  public isSpinning = false;

  constructor(private route: ActivatedRoute,
              private terminalService: TerminalService,
              private templateService: TemplateService,
              private modalService: NgbModal,
              private nzmodalService: NzModalService) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.code = this.route.snapshot.paramMap.get('code');
    this.initPriorities();
    this.getTerminal();
    this.initLists();
    this.getBasic();
  }


  initPriorities() {
    for (let i = 1; i <= 4; i++) {
      this.priorities1.push({
        name: i,
        disabled: false
      });
    }
  }


  // 获取终端信息
  getTerminal() {

    this.templateService.getChannelInfo(this.uid)
      .subscribe(data => {
        const channels = data;

        //
        for (let i = 0; i < channels.length; i++) {
          const chan = channels[i];

          // 模拟量
          if (chan.channel_type === 10) {
            this.analogueList.push({
              Parameter: {
                Name: chan.name,
                Scale: chan.scale,
                Unit: chan.unit
              },
              alarm: chan.alarm,
              Func: chan.func_code,
              Byte: chan.byte_id,
              Modbus: chan.modbus,
              Status: chan.show <= 0 ? 0 : 1,
              SequenceNumber: chan.show > 0 ? chan.show : 0,
              slaveAddress: chan.slave_address,
              writeRule: chan.write_rule.toString(),
              writeValue: chan.write_value
            });
          }

          // 开关量
          if (chan.channel_type === 11) {
            let wv = [];
            if (chan.write_value) {
              wv = chan.write_value.split(',');
            }
            this.switchList.push({
              Parameter: {
                Name: chan.name,
              },
              alarm: chan.alarm,
              Func: chan.func_code,
              Modbus: chan.modbus,
              BitAddress: chan.bit_address,
              Status: chan.show <= 0 ? 0 : 1,
              SequenceNumber: chan.show > 0 ? chan.show : 0,
              slaveAddress: chan.slave_address,
              writeRule: chan.write_rule.toString(),
              writeValue1: wv[0],
              writeValue2: wv[1]
              // SwitchStatus: chan.SwitchStatus,
            });
          }

          // 状态量
          if (chan.channel_type === 12) {
            this.rangeList.push({
              ChannelNumber: chan.ChannelNumber,
              Parameter: {
                Name: chan.name,
              },
              alarm: chan.alarm,
              Ranges: chan.ran,
              Func: chan.func_code,
              Byte: chan.byte_id,
              Modbus: chan.modbus,
              Status: chan.show <= 0 ? 0 : 1,
              SequenceNumber: chan.show > 0 ? chan.show : 0,
              slaveAddress: chan.slave_address,
              writeRule: chan.write_rule.toString(),
              writeValue: chan.write_value
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
              SequenceNumber: -1,
              slaveAddress: null,
              writeRule: 0,
              writeValue: ''
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
              SequenceNumber: -1,
              slaveAddress: null,
              writeRule: 0,
              writeValue1: '',
              writeValue2: ''
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
              SequenceNumber: -1,
              slaveAddress: null,
              writeRule: 0,
              writeValue: ''
            }
          ];
        }


        for ( let j = 0; j < this.priorities1.length; j++) {
          this.priorities1[j].disabled = false;
          for (let i = 0; i < this.analogueList.length; i++) {
            const an = this.analogueList[i];
            if (an.SequenceNumber !== -1) {
              if ( this.priorities1[j].name === an.SequenceNumber) {
                this.priorities1[j].disabled = true;
                break;
              }
            }
          }
          for (let i = 0; i < this.switchList.length; i++) {
            const an = this.switchList[i];
            if (an.SequenceNumber !== -1) {
              if ( this.priorities1[j].name === an.SequenceNumber) {
                this.priorities1[j].disabled = true;
                break;
              }
            }
          }
          for (let i = 0; i < this.rangeList.length; i++) {
            const an = this.rangeList[i];
            if (an.SequenceNumber !== -1) {
              if ( this.priorities1[j].name === an.SequenceNumber) {
                this.priorities1[j].disabled = true;
                break;
              }
            }
          }
        }

      });

  }

  // 初始化下拉列表
  initLists() {
    // 功能码
    this.funcs = [
      {
        'Id': 1,
        'Name': '01',
        'Value': 1
      },
      {
        'Id': 2,
        'Name': '02',
        'Value': 2
      },
      {
        'Id': 3,
        'Name': '03',
        'Value': 3
      },
      {
        'Id': 4,
        'Name': '04',
        'Value': 4
      },
      {
        'Id': 99,
        'Name': 'None',
        'Value': 99
      }
    ];

    /*this.terminalService.getFuncode()
      .subscribe(fun => {
        this.funcs = fun;
      });*/


    // 高低字节
    this.terminalService.getChannelParam()
      .subscribe(data => {
        this.bytes = data.byte;
      });




  }

  // 获取模板基本信息
  getBasic() {
    this.terminalService.getEpt(this.uid)
      .subscribe(data => {
        this.basic = data;
      }, err => {

      });
  }


  // 添加模拟量
  addAnalogue() {
    // const n = this.analogueList.length;
    this.analogueList.push({
      // ChannelNumber: n + 1,
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
      SequenceNumber: -1,
      slaveAddress: null,
      writeRule: null,
      writeValue: null
    });
  }

  // 添加开关量
  addSwitch() {
    const n = this.switchList.length;
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
      SequenceNumber: -1,
      slaveAddress: null,
      writeRule: '',
      writeValue1: '',
      writeValue2: ''
    });
  }

  // 添加状态量
  addRange() {
    const n = this.rangeList.length;
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
      SequenceNumber: -1,
      slaveAddress: null,
      writeRule: null,
      writeValue: null
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
      data.slaveAddress = null;
    } else {
      if (!data.Status || data.Status === -1) {
        data.Status = 0;
      }

      // if (!data.SwitchStatus || data.SwitchStatus === 0) {
      //   data.SwitchStatus = 1;
      // }

    }
  }

  // 设置位置
  setStatus(data, status, sn?) {
    if (sn && sn.disabled) {
      return;
    }
    data.Status = status;
    if (status === 1) {
      data.SequenceNumber = sn.name;
    } else {
      data.SequenceNumber = status;
    }

    for ( let j = 0; j < this.priorities1.length; j++) {
      this.priorities1[j].disabled = false;
      for (let i = 0; i < this.analogueList.length; i++) {
        const an = this.analogueList[i];
        if (an.SequenceNumber !== -1) {
          if ( this.priorities1[j].name === an.SequenceNumber) {
            this.priorities1[j].disabled = true;
            break;
          }
        }
      }
      for (let i = 0; i < this.switchList.length; i++) {
        const an = this.switchList[i];
        if (an.SequenceNumber !== -1) {
          if ( this.priorities1[j].name === an.SequenceNumber) {
            this.priorities1[j].disabled = true;
            break;
          }
        }
      }
      for (let i = 0; i < this.rangeList.length; i++) {
        const an = this.rangeList[i];
        if (an.SequenceNumber !== -1) {
          if ( this.priorities1[j].name === an.SequenceNumber) {
            this.priorities1[j].disabled = true;
            break;
          }
        }
      }
    }
  }



  // 添加告警规则
  addAlarmRule(data) {
    const modalRef = this.modalService.open(AlarmRuleComponent, {size: 'lg'});
    modalRef.componentInstance.currentData = data;
    modalRef.result.then((result) => {
      data.alarm = result;
      console.log(data, this.analogueList);
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }


  // 状态设置
  setSwitchStatus(outerIndex, status) {
    this.switchList[outerIndex].SwitchStatus = status;
  }


  // 状态量配置
  openRange(data) {
    const modalRef = this.modalService.open(RangeConfigComponent, {size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.currentData = data;
    modalRef.result.then((result) => {
      data.Ranges = result;
      console.log(result, data);
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }


  fCodeChange(data) {
    if (data.Func === '1' || data.Func === '2') {
      data.BitAddress = 1;
    }
  }


  save() {
    const that = this;

    // 模拟通道
    const analogueList = [];
    for (let i = 0; i < this.analogueList.length; i++) {
      if (this.analogueList[i].Parameter.Name) {
        if (parseInt(this.analogueList[i].Func) === 99) {
          // this.analogueList[i].Byte = null;
          // this.analogueList[i].Modbus = null;
          // this.analogueList[i].slaveAddress = null;
          // this.analogueList[i].writeRule = null;
          // this.analogueList[i].writeValue = null;
          if (!this.analogueList[i].Parameter.Scale || !this.analogueList[i].Parameter.Unit) {
            this.nzmodalService.error({
              nzTitle: '通道配置更新失败',
              nzContent: `模拟通道[ ${i + 1} ]配置信息不全 ，乘积转换比及单位不能为空 `
            });
            return false;
          }
        } else if (!this.analogueList[i].Func || !this.analogueList[i].Byte || !this.analogueList[i].Modbus || !this.analogueList[i].Parameter.Scale || !this.analogueList[i].Parameter.Unit) {
          this.nzmodalService.error({
            nzTitle: '通道配置更新失败',
            nzContent: `模拟通道[ ${i + 1} ]配置信息不全 ，参数不能为0 `
          });
          return false;
        }

        if (parseInt(this.analogueList[i].Func) !== 99 && (!this.analogueList[i].slaveAddress || this.analogueList[i].slaveAddress > 255 || this.analogueList[i].slaveAddress < 1)) {
          this.nzmodalService.error({
            nzTitle: '通道配置更新失败',
            nzContent: `模拟通道[ ${i + 1} ]从机地址错误 `
          });
          return false;
        }
        if (parseInt(this.analogueList[i].Func) === 1 || parseInt(this.analogueList[i].Func) === 3) {
          if (this.analogueList[i].writeRule !== '0') {
            if (!this.analogueList[i].writeValue) {
              this.nzmodalService.error({
                nzTitle: '通道配置更新失败',
                nzContent: `模拟通道[ ${i + 1} ]配置信息不全 ，参数不能为空 `
              });
              return false;
            }
          }
          /*if (this.analogueList[i].Modbus <= 40000 || this.analogueList[i].Modbus >= 50000) {
            this.nzmodalService.error({
              nzTitle: `模拟通道[ ${i} ]MODBUS地址错误`,
              nzContent: '功能码为03，MODBUS地址范围40001-49999'
            });
            return false;
          }*/
        }
        /*if (parseInt(this.analogueList[i].Func) === 3) {
          /!*if (this.analogueList[i].Modbus <= 30000 || this.analogueList[i].Modbus >= 40000) {
            this.nzmodalService.error({
              nzTitle: `模拟通道[ ${i} ]MODBUS地址错误`,
              nzContent: '功能码为04，MODBUS地址范围30001-39999'
            });
            return false;
          }*!/
        }*/
        analogueList.push({
          name: this.analogueList[i].Parameter.Name,
          scale: this.analogueList[i].Parameter.Scale,
          unit: this.analogueList[i].Parameter.Unit,
          alarm: this.analogueList[i].alarm,
          func_code: parseInt(this.analogueList[i].Func),
          byte_id: parseInt(this.analogueList[i].Byte),
          modbus: this.analogueList[i].Modbus,
          show: this.analogueList[i].Status === 1 ? this.analogueList[i].SequenceNumber : 0,
          slave_address: this.analogueList[i].slaveAddress,
          write_rule: parseInt(this.analogueList[i].writeRule),
          write_value: this.analogueList[i].writeValue
        });
      }
    }


    // 开关通道
    const switchList = [];

    for (let i = 0; i < this.switchList.length; i++) {
      if (this.switchList[i].Parameter.Name) {
        if ((parseInt(this.switchList[i].Func) !== 99) && (!this.switchList[i].Func || !this.switchList[i].BitAddress || !this.switchList[i].Modbus)) {

          this.nzmodalService.error({
            nzTitle: '通道配置更新失败',
            nzContent: `开关通道[${i + 1}]配置信息不全 ，参数不能为0 `
          });
          return false;
        }
        if (parseInt(this.switchList[i].Func) !== 99 && (!this.switchList[i].slaveAddress || this.switchList[i].slaveAddress > 255 || this.switchList[i].slaveAddress < 1)) {
          this.nzmodalService.error({
            nzTitle: '通道配置更新失败',
            nzContent: `开关通道[ ${i + 1} ]从机地址错误 `
          });
          return false;
        }
        if ((parseInt(this.switchList[i].Func) !== 99) && (parseInt(this.switchList[i].Func) === 1 || parseInt(this.switchList[i].Func) === 3)) {
          if (this.switchList[i].writeRule !== '0') {
            if (!this.switchList[i].writeValue1 || !this.switchList[i].writeValue2 ) {
              this.nzmodalService.error({
                nzTitle: '通道配置更新失败',
                nzContent: `开关通道[ ${i + 1} ]配置信息不全 ，参数不能为空 `
              });
              return false;
            }
          }
          /*if (this.switchList[i].Modbus < 1 || this.switchList[i].Modbus >= 10000) {
            this.nzmodalService.error({
              nzTitle: `开关通道[${i}]MODBUS地址错误`,
              nzContent: `功能码为01，MODBUS地址范围00001-09999`
            });
            return false;
          }*/
          /*if (this.switchList[i].BitAddress !== 1) {
            this.nzmodalService.error({
              nzTitle: `开关通道[${i + 1}]位地址错误`,
              nzContent: '功能码为01，对应位地址为1'
            });
            return false;
          }*/
        }
        /*if (parseInt(this.switchList[i].Func) === 2) {
          /!*if (this.switchList[i].Modbus <= 10000 || this.switchList[i].Modbus >= 20000) {
            this.nzmodalService.error({
              nzTitle: `开关通道[${i}]MODBUS地址错误`,
              nzContent: '功能码为02，MODBUS地址范围10001-19999'
            });
            return false;
          }*!/
          /!*if (this.switchList[i].BitAddress !== 1) {
            this.nzmodalService.error({
              nzTitle: `开关通道[${i}]位地址错误`,
              nzContent: '功能码为02，对应位地址为1'
            });
            return false;
          }*!/
        }
        if (parseInt(this.switchList[i].Func) === 3) {
          /!*if (this.switchList[i].Modbus <= 40000 || this.switchList[i].Modbus >= 50000) {
            this.nzmodalService.error({
              nzTitle: `开关通道[${i}]MODBUS地址错，请修改`,
              nzContent: '功能码为03，MODBUS地址范围40001-49999'
            });
            return false;
          }*!/
          if (this.switchList[i].BitAddress < 1 || this.switchList[i].BitAddress > 16) {
            this.nzmodalService.error({
              nzTitle: `开关通道[${i}]位地址错误`,
              nzContent: '功能码为03，对应位地址范围为1-16'
            });
            return false;
          }
        }*/
        switchList.push({
          name: this.switchList[i].Parameter.Name,
          alarm: this.switchList[i].alarm,
          func_code: parseInt(this.switchList[i].Func),
          modbus: this.switchList[i].Modbus,
          bit_address: this.switchList[i].BitAddress,
          show: this.switchList[i].Status === 1 ? this.switchList[i].SequenceNumber : 0,
          slave_address: this.switchList[i].slaveAddress,
          write_rule: parseInt(this.switchList[i].writeRule),
          write_value: this.switchList[i].writeValue1 + ',' + this.switchList[i].writeValue1
        });
      }
    }



    // 状态通道
    const rangeList = [];

    for (let i = 0; i < this.rangeList.length; i++) {
      if (this.rangeList[i].Parameter.Name) {
        if ((parseInt(this.rangeList[i].Func) !== 99) && (!this.rangeList[i].Func || !this.rangeList[i].Byte || !this.rangeList[i].Modbus)) {
          this.nzmodalService.error({
            nzTitle: '通道配置更新失败',
            nzContent: `状态通道[${i + 1}]配置信息不全 ，参数不能为0 `
          });
          return false;
        }

        if ((parseInt(this.rangeList[i].Func) !== 99) && (!this.rangeList[i].slaveAddress || this.rangeList[i].slaveAddress > 255 || this.rangeList[i].slaveAddress < 1)) {
          this.nzmodalService.error({
            nzTitle: '通道配置更新失败',
            nzContent: `状态通道[ ${i + 1} ]从机地址错误 `
          });
          return false;
        }

        if (parseInt(this.rangeList[i].Func) === 1 || parseInt(this.rangeList[i].Func) === 3) {
          if (this.rangeList[i].writeRule !== '0') {
            if (!this.rangeList[i].writeValue) {
              this.nzmodalService.error({
                nzTitle: '通道配置更新失败',
                nzContent: `状态通道[ ${i + 1} ]配置信息不全 ，参数不能为空 `
              });
              return false;
            }
          }
        }
        /*if (parseInt(this.rangeList[i].Func) === 3) {
          if (this.rangeList[i].Modbus <= 40000 || this.rangeList[i].Modbus >= 50000) {
            this.nzmodalService.error({
              nzTitle: `状态通道[${this.rangeList[i].ChannelNumber}]MODBUS地址错误`,
              nzContent: '功能码为03，MODBUS地址范围40001-49999'
            });
            return false;
          }
        }
        if (parseInt(this.rangeList[i].Func) === 4) {
          if (this.rangeList[i].Modbus <= 30000 || this.rangeList[i].Modbus >= 40000) {
            this.nzmodalService.error({
              nzTitle: `状态通道[${this.rangeList[i].ChannelNumber}]MODBUS地址错误`,
              nzContent: '功能码为04，MODBUS地址范围30001-39999'
            });
            return false;
          }
        }*/

        if (this.rangeList[i].Ranges.length <= 0) {
          this.nzmodalService.error({
            nzTitle: `状态量通道[${i + 1}]配置错误`,
            nzContent: '已配置的状态量通道，需要完成其状态值的配置才可提交'
          });
          return;
        }

        rangeList.push({
          name: this.rangeList[i].Parameter.Name,
          alarm: this.rangeList[i].alarm,
          func_code: parseInt(this.rangeList[i].Func),
          byte_id: parseInt(this.rangeList[i].Byte),
          modbus: this.rangeList[i].Modbus,
          ran: this.rangeList[i].Ranges,
          show: this.rangeList[i].Status === 1 ? this.rangeList[i].SequenceNumber : 0,
          slave_address: this.rangeList[i].slaveAddress,
          write_rule: parseInt(this.rangeList[i].writeRule),
          write_value: this.rangeList[i].writeValue
        });
      }
    }




    const data = {
      analogue: analogueList,
      switch: switchList,
      range: rangeList,
      uid: this.uid
    };

    this.isSpinning = true;

    this.templateService.addChannel(data)
      .subscribe(val => {
        this.isSpinning = false;
        Swal({
          title: '通道配置更新成功',
          text: '',
          type: 'success'
        });
      }, err => {
        this.isSpinning = false;
        Swal({
          title: '通道配置更新失败',
          text: err.message || err,
          type: 'error'
        });
      });


  }




  goBack() {
    window.history.go(-1);
  }


}
