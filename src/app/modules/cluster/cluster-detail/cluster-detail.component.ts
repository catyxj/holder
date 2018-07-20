import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ClusterService} from "../../../shared/cluster.service";

@Component({
  selector: 'app-cluster-detail',
  templateUrl: './cluster-detail.component.html',
  styleUrls: ['./cluster-detail.component.css']
})
export class ClusterDetailComponent implements OnInit {

  public uid;
  public name;
  public equipList;
  public page = 1;
  public totalItems = 0;
  public search: string;
  public deleteList = [];
  public allDelete = false;
  public pageSize = 10;

  constructor(private route: ActivatedRoute,
              private clusterService: ClusterService) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.name = this.route.snapshot.paramMap.get('name');
    this.getclusters();
  }

  getclusters() {
    this.equipList = [
      {
        Name: '123444',
        Uid: '123465677779997'
      }
    ];
  }


  delete(uid) {
    let data = {
      cluster_uid: this.uid,
      equipment: [uid]
    };
    this.clusterService.deleteEquip(data)
      .subscribe( () => {
        this.pageChange();
      });
  }

  // 批量选择
  checkDel(cluster): void {
    if ( cluster.checkDelete === true) {
      this.deleteList.push(cluster.Uid);
    } else {
      for (let i = 0; i < this.deleteList.length; i++){
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
      for (let i = 0; i < this.equipList.length; i++) {
        this.equipList[i].checkDelete = true;
        this.deleteList.push(this.equipList[i].Uid);
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
    const cf = confirm(`确认删除选中设备 ？`);
    if (cf === true) {
      let data = {
        cluster_uid: this.uid,
        equipment: this.deleteList
      };
      this.clusterService.deleteEquip(data)
        .subscribe(() => {
          this.pageChange();
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



}
