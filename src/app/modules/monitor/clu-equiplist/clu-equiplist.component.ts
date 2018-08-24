import {Component, OnDestroy, OnInit} from '@angular/core';
import {BoilerService} from "../../../shared/boiler.service";
import {BoilerSocketService} from "../../../shared/boiler-socket.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-clu-equiplist',
  templateUrl: './clu-equiplist.component.html',
  styleUrls: ['./clu-equiplist.component.css']
})
export class CluEquiplistComponent implements OnInit, OnDestroy {

  public equips: any = [];
  public page = 1;
  public totalItems = 0;
  public pageSize = 10;
  public search: string;
  public checkList = [];
  public allCheck = false;
  public uid;
  private socket;

  constructor(private boilerService: BoilerService,
              private route: ActivatedRoute,
              private boilerWsService: BoilerSocketService) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    let message = {
      page: this.page,
      search: this.search,
      pageSize: this.pageSize,
      uid: this.uid
    };
    this.getClusterEquip(message);
  }

  // 获取列表数据
  getClusterEquip(message) {
    const wsUrl = `ws://${window.location.host}/clusters_detail_show`;
    this.socket = this.boilerWsService.creatSocket(wsUrl, message)
      .subscribe(
        data => {
          let equipList = JSON.parse(data);
          this.totalItems = equipList.counts;
          this.equips = equipList.ept;
          for (let i = 0; i < this.equips.length; i++) {
            let bo = this.equips[i];

            if (bo.termStatus === 1) {
              bo.online = '终端在线';
              if (bo.eptStatus === true) {
                bo.isBurning = '运行中';
              } else {
                bo.isBurning = '未运行';
              }
              if (bo.alarmStatus === true) {
                bo.warning = '有告警';
              } else {
                bo.warning = '无告警';
              }
              if (bo.Malfunction === true) {
                bo.malfunction = '有故障';
              } else {
                bo.malfunction = '无故障';
              }
            } else if (bo.termStatus === 0) {
              bo.online = '终端离线';
              bo.isBurning = '未运行';
              bo.warning = '无告警';
              bo.malfunction = '无故障';
            } else {
              bo.online = '未绑定';
              bo.isBurning = '未运行';
              bo.warning = '无告警';
              bo.malfunction = '无故障';
            }
          }
        },
        err => console.log(err),
        () => console.log('ws结束')
      );

    /*this.equips = [
      {
        Uid: '12316346',
        Name: 'ad1da',
        Online: true,
        IsBurning: false,
        Warning: false,
        Malfunction: false
      }
    ];
    this.totalItems = 2;
    for (let i = 0; i < this.equips.length; i++) {
      let eq = this.equips[i];
      if (eq.Online === true) {
        eq.online = '终端在线';
        if (eq.IsBurning === true) {
          eq.isBurning = '设备运行中';
        } else {
          eq.isBurning = '设备未运行';
        }
        if (eq.Warning === true) {
          eq.warning = '有告警';
        } else {
          eq.warning = '无告警';
        }
        if (eq.Malfunction === true) {
          eq.malfunction = '有故障';
        } else {
          eq.malfunction = '无故障';
        }
      } else {
        eq.online = '终端离线';
        eq.isBurning = '设备未运行';
        eq.warning = '无告警';
        eq.malfunction = '无故障';
      }
    }*/
  }

  // 每页数量
  pageSizeChange() {
    this.page = 1;
    this.pageChange();
  }

  // 页码变化
  pageChange(): void {
    let message = {
      page: this.page,
      search: this.search,
      pageSize: this.pageSize,
      uid: this.uid
    };
    this.getClusterEquip(message);
  }

  // 搜索
  searchChange() {
    this.page = 1;
    this.pageChange();
  }


  // 批量选择
  checkDel(cluster): void {
    if ( cluster.checkDelete === true) {
      this.checkList.push(cluster);
    } else {
      for (let i = 0; i < this.checkList.length; i++) {
        let dl = this.checkList[i];
        if (dl.Uid === cluster.Uid) {
          this.checkList.splice(i, 1);
        }
      }
    }
  }

  // 全选
  allDel() {
    if (this.allCheck === true) {

      for (let i = 0; i < this.equips.length; i++) {
        this.equips[i].checkDelete = true;
        this.checkList.push(this.equips[i]);
      }
    } else {
      for (let i = 0; i < this.equips.length; i++) {
        this.equips[i].checkDelete = false;
        // this.checkList.splice(i, 1);
      }
      this.checkList = [];
    }
  }


  control(data, n) {
    console.log(data, n);
  }

  groupControl(n) {
    if (this.checkList.length <= 0) {
      alert('没有选择设备');
      return;
    }
    console.log(this.checkList, n);
  }


  ngOnDestroy() {
    this.socket.unsubscribe();
    this.boilerWsService.closeSocket();
  }


}
