import {Component, OnDestroy, OnInit} from '@angular/core';
import {BoilerSocketService} from "../../../shared/boiler-socket.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RuntimeService} from "../../../shared/runtime.service";
import {filter} from "rxjs/internal/operators";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class RuntimeDashboardComponent implements OnInit, OnDestroy {

  public equipment;
  public analogues = [];
  public switchs = [];
  public ranges = [];
  private socket;
  public uid;
  public online;
  public isBurning;
  public hasWarning;
  private equip;
  public termStatus;
  public eptStatus;
  public alarmStatus;
  public img;
  public imgRun;
  public imgStop;
  public controlShow = false;
  public averageList;
  public isLoading = false;

  constructor(private boilerWsService: BoilerSocketService,
              private route: ActivatedRoute,
              private router: Router,
              private runtimeService: RuntimeService) { }

  ngOnInit() {
    this.uid = sessionStorage.getItem('runtimeUid');

    this.initStatus();

    // this.initTest();

    this.initData();
  }

  initStatus() {
    this.runtimeService.getEquipTemp(this.uid)
      .subscribe( data => {
        this.imgRun = data.ImageRun;
        this.imgStop = data.ImageStop;
        this.controlShow = data.EptCtlShow;
      });
  }

  initData() {
    let message = {
      uid: this.uid
    };
    const wsUrl = `wss://${window.location.host}/equipment_instant`;
    this.socket = this.boilerWsService.creatSocket(wsUrl, message)
      .subscribe(
        data => {
          // console.log(data);
          this.equip = JSON.parse(data);
          // console.log(equipment);
          this.equipment = this.equip.instants;
          this.termStatus = this.equip.termStatus;
          this.eptStatus = this.equip.eptStatus;
          this.alarmStatus = this.equip.alarmStatus;

          switch (this.termStatus) {
            case 0:
              this.online = '离线';
              break;
            case 1:
              this.online = '在线';
              break;
            case -1:
              this.online = '未绑定';
              break;
          }

          this.isBurning = this.eptStatus ? '运行中' : '未运行';
          this.hasWarning = this.alarmStatus ? '有告警' : '无告警';
          if (this.termStatus && this.eptStatus) {
            this.img = this.imgRun;
          } else {
            this.img = this.imgStop;
          }

          let analogues = [];
          let switchs = [];
          let ranges = [];
          if (this.equipment) {
            for (let i = 0; i < this.equipment.length; i++) {
              let eq = this.equipment[i];
              if (eq.Status === 2) {
                continue;
              }
              if ( eq.Status !== 1) {
                eq.SequenceNumber = eq.ChannelNumber;
              }
              if (eq.ChannelType === 1) {
                analogues.push(eq);
              }
              if (eq.ChannelType === 3) {
                switchs.push(eq);
              }
              if (eq.ChannelType === 5) {
                ranges.push(eq);
              }
            }
            this.order(analogues);
            this.order(switchs);
            this.order(ranges);

            this.analogues = analogues;
            this.switchs = switchs;
            this.ranges = ranges;


          //  ---------平均值-------------
            this.averageCal();

          }



        },
        err => console.log(err),
        () => console.log('ws结束')
      );
  }

  initTest() {
    this.runtimeService.getInstants()
      .subscribe( data => {
        this.equipment = data;
        console.log(this.equipment);
        let analogues = [];
        let switchs = [];
        let ranges = [];
        if (this.equipment) {
          for (let i = 0; i < this.equipment.length; i++) {
            let eq = this.equipment[i];
            if ( eq.SequenceNumber === -1) {
              eq.SequenceNumber = eq.ChannelNumber;
            }
            if (eq.ChannelType === 1) {
              analogues.push(eq);
            }
            if (eq.ChannelType === 3) {
              switchs.push(eq);
            }
            if (eq.ChannelType === 5) {
              ranges.push(eq);
            }
          }
          this.order(analogues);
          this.order(switchs);
          this.order(ranges);

          this.analogues = analogues;
          this.switchs = switchs;
          this.ranges = ranges;
        }


        this.online = true;
        this.isBurning = true;
        if (this.isBurning) {
          this.img = 'assets/images/boilerwater.gif';
        } else {
          this.img = 'assets/images/boilerwater.png';
        }

      }, err => {});
  }

  order(arr) {
    arr.sort(function(a, b) {
      return a.SequenceNumber - b.SequenceNumber;
    });
  }

  // 控制
  equipControl(n) {
    let that = this;
    let ctrlData = {
      uid: this.uid,
      ctl_type: n
    };
    this.isLoading = true;
    this.runtimeService.equipControl(ctrlData)
      .subscribe( data => {
        that.isLoading = false;
        Swal(
          '发送成功！',
          '',
          'success'
        );
      }, err => {
        that.isLoading = false;
        Swal(
          '发送失败！',
          err,
          'error'
        );
      });
  }


  goBack() {
    window.history.go(-1);
  }


  trackByUid(index, item) {
    return item.ChannelNumber;
  }

  // 平均值
  averageCal() {
    let averageList = [];
    let averages = [];
    for (let i = 1; i <= 24; i++) {
      averageList[i - 1] = [];
      let aL = averageList[i - 1];
      for (let j = 0; j < this.analogues.length; j++) {
        let ana = this.analogues[j];
        if (ana.ChannelNumber === i) {
          averageList[i - 1].push(ana);
        }
      }
      if (aL.length > 0) {
        let sum = 0;
        let alarm = false;
        for (let n = 0; n < aL.length; n++) {
          sum += aL[n].Value;
          if (alarm === false && aL[n].AlarmStatus === true) {
            alarm = true;
          }
        }
        let mean  = Math.round((sum / aL.length) * 100) / 100;
        averages.push({
          chanNum: aL[0].ChannelNumber,
          average: mean,
          Unit: aL[0].Unit,
          AlarmStatus: alarm
        });
      }
    }

    this.averageList = averages;
    // console.log(averages);
  }


  ngOnDestroy() {
    this.socket.unsubscribe();
    this.boilerWsService.closeSocket();
  }

}
