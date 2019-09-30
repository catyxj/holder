import {Component, OnDestroy, OnInit} from '@angular/core';
import {BoilerSocketService} from "../../../../shared/boiler-socket.service";
import {RuntimeService} from "../../../../shared/runtime.service";

import Swal from 'sweetalert2';
import {BoilerService} from "../../../../shared/boiler.service";

@Component({
  selector: 'app-runtime-dashboard',
  templateUrl: './runtime-dashboard.component.html',
  styleUrls: ['./runtime-dashboard.component.css']
})
export class RuntimeDashboardComponent implements OnInit, OnDestroy {
  public uid;
  private socket;
  public online;
  public run;
  public alarm;
  public malfunction;
  private token;
  public date;
  public info;


  // 组态元素
  public elements;
  public imgs1 = [];
  public imgs2 = []; // 单形态图片
  public imgs3 = []; // 多形态图片
  public btns = []; // 按钮
  public dataLists1 = []; // 固定文本框
  public dataLists2 = []; // 自定义文本框
  public imgChans = [];
  public dataChans = [];
  public btnChans = [];

  constructor(private boilerWsService: BoilerSocketService,
              private runtimeService: RuntimeService,
              private eptService: BoilerService) { }

  ngOnInit() {
    this.uid = sessionStorage.getItem('runtimeUid');
    this.token = localStorage.getItem('authToken');
    this.getInfo();
    this.getContent();
  }

  getInfo() {
    this.eptService.getInfo(this.uid)
      .subscribe(data => {
        this.info = data;
      }, err => {

      });
  }

  // 获取页面内容
  getContent() {
    let that = this;
    this.runtimeService.getContent(this.uid)
      .subscribe(data => {
        that.elements = JSON.parse(data.content);
        that.imgs1 = [];
        that.imgs2 = [];
        that.imgs3 = [];
        that.btns = [];
        that.dataLists1 = [];
        that.dataLists2 = [];

        that.imgs1 = that.elements.imgs1;
        that.imgs2 = that.elements.imgs2;
        that.imgs3 = that.elements.imgs3;
        that.btns = that.elements.btns;
        that.dataLists1 = that.elements.data1;
        that.dataLists2 = that.elements.data2;
        // console.log(that.elements);
        this.getData();
      }, err => {

      });
  }


  // 获取数据
  getData() {
    /*this.chans = [
      {
        chanType: 1,
        chanNumber: 3,
        name: '温度1',
        value: 222
      },
      {
        chanType: 3,
        chanNumber: 3,
        name: '排烟温度',
        value: 22331
      },
      {
        chanType: 1,
        chanNumber: 4,
        name: '气压',
        value: 21211
      },
      {
        chanType: 1,
        chanNumber: 5,
        name: 'hhhhhhh',
        value: 56544
      },
      {
        chanType: 5,
        chanNumber: 5,
        name: 'hhhhhhh',
        value: 56544
      }
    ];
    this.dataList();*/

    let message = {
      uid: this.uid
    };


    let roleId = localStorage.getItem('roleId');
    let wsUrl;
    if (roleId === '10') {
      wsUrl = `api/formal/ept/instant/ws?token=${this.token}`;
    }
    if (roleId === '11') {
      wsUrl = `api/general/ept/instant/ws?token=${this.token}`;
    }

    this.socket = this.boilerWsService.creatSocket(wsUrl, message)
      .subscribe(
        data => {
          let equips = JSON.parse(data);
          // console.log(equips);
          this.online = equips.online;
          this.run = equips.run;
          this.alarm = equips.alarm_count > 0;
          this.malfunction = equips.mal_func;
          this.imgChans = equips.img_instant;
          this.dataChans = equips.data_instant;
          this.btnChans = equips.btn_instant;
          this.date = equips.updated_at;
          this.dataList();
        },
        err => console.log(err),
        () => console.log('ws结束')
      );

  }

  // 数据处理
  dataList() {
    let that = this;

    /*for (let i = 0; i < this.dataLists1.length; i++) {
      let el = that.dataLists1[i];
      for (let j = 0; j < that.chans.length; j++) {
        let ch = that.chans[j];
        if (parseInt(el.chanType) === ch.chanType && parseInt(el.chanNum) === ch.chanNumber) {
          el.name = ch.name;
          el.value = ch.value;
          // console.log(el, ch);
          break;
        }
      }
    }*/
    for (let i = 0; i < this.dataLists2.length; i++) {
      let el = that.dataLists2[i];
      for (let j = 0; j < that.dataChans.length; j++) {
        let ch = that.dataChans[j];
        if (parseInt(el.chanType) === ch.channel_type && parseInt(el.chanNum) === ch.channel_number) {
          el.name = ch.name;
          el.value = ch.value;
          el.unit = ch.unit;
          el.remark = ch.remark;
          el.alarm_status = ch.alarm_status;
          el.sort = ch.sort;

           /*ept_id, name, remark, channel_type, channel_number, alarm_status, value, unit, sort */
          // console.log(el, ch);
          break;
        }
      }
    }
    for (let i = 0; i < this.imgs3.length; i++) {
      let el = that.imgs3[i];
      for (let j = 0; j < that.imgChans.length; j++) {
        let ch = that.imgChans[j];
        if (parseInt(el.chanType) === ch.channel_type && parseInt(el.chanNum) === ch.channel_number) {
          el.name = ch.name;
          el.value = ch.value;
          for (let k = 0; k < el.imgs.imgs.length; k++) {
            let eig = el.imgs.imgs[k];
            if (el.value >= eig.min && el.value <= eig.max) {
              el.src = eig.img;
              break;
            }
          }
          // console.log(el, ch);
          break;
        }
      }
    }
    for (let i = 0; i < this.btns.length; i++) {
      let el = that.btns[i];
      for (let j = 0; j < that.btnChans.length; j++) {
        let ch = that.btnChans[j];
        if (parseInt(el.chanType) === ch.channel_type && parseInt(el.chanNum) === ch.channel_number) {
          el.name = ch.name;
          el.value = ch.value;
          el.switchValue = ch.value === 1;
          el.loading = false;
          // console.log(el, ch);
          break;
        }
      }
    }

    // console.log(this.imgs1, this.imgs2, this.imgs3, this.btns);
  }

  /*sendMes(n, data) {
    switch (n) {
      case 1:
        this.status = true;
        console.log('启动', data, data.address);
        break;
      case 2:
        this.status = false;
        console.log('关闭', data);
    }
  }*/

  // 开关
  clickSwitch(btn) {
    if (!btn.loading ) {
      btn.loading = true;
      console.log(btn);
      // cName: "交互按钮"
      // cType: "开关型态"
      // chanName: "温度1"
      // chanNum: "3"
      // chanType: "11"
      let n;
      switch (btn.switchValue) {
        case true:
          n = false; // 关闭
          break;
        case false:
          n = true; // 开启
          break;
      }
      let post = {
        ept_id: this.uid,
        channel_type: btn.chanType,
        channel_number: btn.chanNum,
        console_type: n
      };

      this.runtimeService.equipControl(post)
        .subscribe( res => {
          btn.loading = false;
          Swal(
            '请求发送成功，请等待终端操作',
            '',
            'error'
          );
        }, err => {
          btn.loading = false;
          Swal(
            '请求发送失败',
            err.message || err,
            'error'
          );
        });
      /*setTimeout(() => {
        btn.loading = false;
        Swal(
          '没加路径呢，点了也没用',
          '',
          'error'
        );
        // btn.switchValue = !btn.switchValue;
      }, 2000);*/
    }
  }

  sendMessage(message) {
    this.boilerWsService.sendText(message);
  }

  trackByUid(index, item) {
    return item.id;
  }

  ngOnDestroy() {
    console.log('close');
    if (this.socket) {
      console.log('socket end');
      this.sendMessage('close');
      this.socket.unsubscribe();
      this.boilerWsService.closeSocket();
    }
  }

}
