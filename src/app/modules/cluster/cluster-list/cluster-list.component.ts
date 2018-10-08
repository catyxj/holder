import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ClusterService} from '../../../shared/cluster.service';
import {AddClusterComponent} from '../add-cluster/add-cluster.component';
import {EditClusterComponent} from "../edit-cluster/edit-cluster.component";
import Swal from 'sweetalert2';
import {UserService} from "../../../shared/user.service";

@Component({
  selector: 'app-cluster-list',
  templateUrl: './cluster-list.component.html',
  styleUrls: ['./cluster-list.component.css']
})
export class ClusterListComponent implements OnInit {

  public user;
  public clusters;
  public page = 1;
  public totalItems = 0;
  public search: string;
  public deleteList = [];
  public allDelete = false;
  public pageSize = 10;
  public isSpinning = false;
  public isLoading = false;

  constructor(private modalService: NgbModal,
              private clusterService: ClusterService,
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
    this.getclusters();
  }

  // 获取集群列表
  getclusters() {
    this.isSpinning = true;
    this.clusterService.getClusters(this.page, this.pageSize, this.search)
      .subscribe( data => {
        this.isSpinning = false;
        this.clusters = data.params;
        this.totalItems = data.counts;
      }, err => {
        this.isSpinning = false;
      });
  }

  // 删除
  delete(uid, name) {
    let cf = confirm(`确定删除集群[${name}]？`);
    if (cf === true) {
      this.clusterService.deleteCluster([uid])
        .subscribe( () => {
          Swal(
            '删除成功！',
            '',
            'success'
          );
          this.pageChange();
        }, err => {
          Swal(
            '删除失败！',
            '',
            'error'
          );
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
      this.isLoading = true;
      this.clusterService.deleteCluster(this.deleteList)
        .subscribe(() => {
          this.isLoading = false;
          Swal(
            '删除成功！',
            '',
            'success'
          );
          this.pageChange();
        }, err => {
          this.isLoading = false;
          Swal(
            '删除失败！',
            '',
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

  // 添加集群模态框
  newCluster() {
    const modalRef = this.modalService.open(AddClusterComponent);
    // modalRef.componentInstance.currentUser = this.user;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        this.pageChange();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }

  // 修改集群模态框
  editCluster(clus) {
    const modalRef = this.modalService.open(EditClusterComponent);
    modalRef.componentInstance.currentData = clus;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        this.pageChange();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }


}
