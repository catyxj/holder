import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ClusterService} from "../../../shared/cluster.service";
import Swal from 'sweetalert2';
import {RuntimeService} from "../../../shared/runtime.service";
import {UserService} from "../../../shared/user.service";

@Component({
  selector: 'app-cluster-detail',
  templateUrl: './cluster-detail.component.html',
  styleUrls: ['./cluster-detail.component.css']
})
export class ClusterDetailComponent implements OnInit {

  public user;
  public uid;
  public name;
  public equipList;
  public page = 1;
  public totalItems = 0;
  public search: string;
  public deleteList = [];
  public allDelete = false;
  public pageSize = 10;
  public isSpinning = false;
  public isLoading = false;
  public isLoading2 = false;
  public isLoading3 = false;

  constructor(private route: ActivatedRoute,
              private clusterService: ClusterService,
              private runtimeService: RuntimeService,
              private userService: UserService) {
    this.userService.userStatus$ // 监测父组件user
      .subscribe( data => {
          this.user = data;
        }
      );
  }

  ngOnInit() {
    let user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.user = user;
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.name = this.route.snapshot.paramMap.get('name');
    this.getclusters();
  }

  getclusters() {
    this.isSpinning = true;
    this.clusterService.getClusEquip(this.uid, this.page, this.pageSize, this.search)
      .subscribe(data => {
        this.isSpinning = false;
        this.equipList = data.ept;
        this.totalItems = data.counts;
        for (let i = 0; i < this.equipList.length; i++) {
          this.equipList[i].isLoading = false;
        }
      }, err => {
        this.isSpinning = false;
      });
  }

  // 移除
  delete(uid) {
    const cf = confirm(`确认从集群中移除设备（设备本身不会被删除）？`);
    if (cf === true) {
      let data = {
        cluster: this.uid,
        equipments: [uid]
      };
      this.clusterService.deleteEquip(data)
        .subscribe( () => {
          Swal(
            '移除成功！',
            '',
            'success'
          );
          this.pageChange();
        }, err => {
          Swal(
            '移除失败！',
            '',
            'error'
          );
        });
    }
  }

  // 批量选择
  checkDel(cluster): void {
    if ( cluster.checkDelete === true) {
      this.deleteList.push(cluster.uid);
    } else {
      for (let i = 0; i < this.deleteList.length; i++){
        let dl = this.deleteList[i];
        if (dl === cluster.uid) {
          this.deleteList.splice(i, 1);
        }
      }
    }
    // console.log(this.deleteList);
  }

  // 全选
  allDel() {
    if (this.allDelete === true) {
      for (let i = 0; i < this.equipList.length; i++) {
        this.equipList[i].checkDelete = true;
        this.deleteList.push(this.equipList[i].uid);
      }
    } else {
      for (let i = 0; i < this.equipList.length; i++) {
        this.equipList[i].checkDelete = false;
        // this.deleteList.splice(i, 1);
      }
      this.deleteList = [];
    }
  }

  // 批量删除

  deleteG() {
    const cf = confirm(`确认移除选中设备（设备本身不会被删除）？`);
    if (cf === true) {
      let data = {
        cluster: this.uid,
        equipments: this.deleteList
      };
      this.isLoading = true;
      this.clusterService.deleteEquip(data)
        .subscribe(() => {
          this.isLoading = false;
          Swal(
            '移除成功！',
            '',
            'success'
          );
          this.pageChange();
        }, err => {
          this.isLoading = false;
          Swal(
            '移除失败！',
            err,
            'error'
          );
        });
    } else {

    }
    // console.log(this.deleteList);
  }

  // 每页数量
  pageSizeChange() {
    this.page = 1;
    if (typeof(this.pageSize) !== 'number') {
      this.pageSize = parseInt(this.pageSize);
    }
    this.pageChange();
  }

  // 页码变化
  pageChange(): void {
    this.getclusters();
    this.allDelete = false;
    this.deleteList = [];
  }

  // 搜索
  searchChange() {
    this.page = 1;
    this.pageChange();
  }


  // 控制
  control(data, n) {
    console.log(data, n);
    let ctrlData = {
      uid: data.uid,
      ctl_type: n
    };
    data.isLoading = true;
    this.runtimeService.equipControl(ctrlData)
      .subscribe( data => {
        data.isLoading = false;
        Swal(
          '发送成功！',
          '',
          'success'
        );
      }, err => {
        data.isLoading = false;
        Swal(
          '发送失败！',
          err,
          'error'
        );
      });
  }

  // 批量控制
  groupControl(n) {
    if (this.deleteList.length <= 0) {
      Swal(
        '没有选择设备',
        '',
        'warning'
      );
      return;
    }
    console.log(this.deleteList, n);
    let post = {
      uids: this.deleteList,
      ctl_type: n
    };
    this.isLoading2 = true;
    this.clusterService.groupControl(post)
      .subscribe(val => {
        this.isLoading2 = false;
        Swal(
          '发送成功！',
          '',
          'success'
        );
      }, err => {
        this.isLoading2 = false;
        Swal(
          '发送失败！',
          err,
          'error'
        );
      });

  }

}
