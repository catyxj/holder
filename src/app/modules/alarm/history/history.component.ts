import { Component, OnInit } from '@angular/core';
import {AlarmService} from "../../../shared/alarm.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  public alarms = [];
  public page = 1;
  public totalItems = 0;
  public search: string;
  public deleteList = [];
  public allDelete = false;
  public pageSize = 10;

  constructor(private alarmService: AlarmService) { }

  ngOnInit() {
    this.getalarms();
  }

  // 获取告警列表
  getalarms() {
    this.alarmService.getHistories(this.page, this.pageSize, this.search)
      .subscribe( data => {
        this.alarms = data.params;
        this.totalItems = data.counts;
      });
  }

  /*// 删除
  delete(uid, name) {
    let cf = confirm(`确定删除集群[${name}]？`);
    if (cf === true) {
      this.clusterService.deleteCluster([uid])
        .subscribe( () => {
          this.pageChange();
        });
    }
  }

  // 批量选择
  checkDel(cluster): void {
    if ( cluster.checkDelete === true) {
      this.deleteList.push(cluster.Uid);
    } else {
      for (let i = 0; i < this.deleteList.length; i++) {
        let dl = this.deleteList[i];
        if (dl === cluster.Uid) {
          this.deleteList.splice(i, 1);
        }
      }
    }
    // console.log(this.deleteList);
  }

  // 全选
  allDel() {
    if (this.allDelete === true) {
      for (let i = 0; i < this.clusters.length; i++) {
        this.clusters[i].checkDelete = true;
        this.deleteList.push(this.clusters[i].Uid);
      }
    } else {
      for (let i = 0; i < this.clusters.length; i++) {
        this.clusters[i].checkDelete = false;
        // this.deleteList.splice(i, 1);
      }
      this.deleteList = [];
    }
  }

  // 批量删除
  deleteG() {
    const cf = confirm(`确认删除选中集群 ？`);
    if (cf === true) {
      this.clusterService.deleteCluster(this.deleteList)
        .subscribe(() => {
          this.pageChange();
        });
    } else {

    }

    // console.log(this.deleteList);
  }*/

  // 每页数量
  pageSizeChange() {
    this.page = 1;
    this.pageChange();
  }

  // 页码变化
  pageChange(): void {
    this.getalarms();
    this.allDelete = false;
    this.deleteList = [];
  }

  // 搜索
  searchChange() {
    this.page = 1;
    this.pageChange();
  }


}
