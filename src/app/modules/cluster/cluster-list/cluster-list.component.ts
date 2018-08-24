import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ClusterService} from '../../../shared/cluster.service';
import {AddClusterComponent} from '../add-cluster/add-cluster.component';
import {EditClusterComponent} from "../edit-cluster/edit-cluster.component";

@Component({
  selector: 'app-cluster-list',
  templateUrl: './cluster-list.component.html',
  styleUrls: ['./cluster-list.component.css']
})
export class ClusterListComponent implements OnInit {

  public clusters;
  public page = 1;
  public totalItems = 0;
  public search: string;
  public deleteList = [];
  public allDelete = false;
  public pageSize = 10;

  constructor(private modalService: NgbModal,
              private clusterService: ClusterService) { }

  ngOnInit() {
    this.getclusters();
  }

  // 获取集群列表
  getclusters() {
    this.clusterService.getClusters(this.page, this.pageSize, this.search)
      .subscribe( data => {
        this.clusters = data.params;
        this.totalItems = data.counts;
      });
  }

  // 删除
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
        }, err => {
        alert(err);
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
