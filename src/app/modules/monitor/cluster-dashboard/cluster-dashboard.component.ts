import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cluster-dashboard',
  templateUrl: './cluster-dashboard.component.html',
  styleUrls: ['./cluster-dashboard.component.css']
})
export class ClusterDashboardComponent implements OnInit {

  clusters: any = [];
  page = 1;
  pageSize = 4;
  totalItems = 0;
  search: string;

  constructor() { }

  ngOnInit() {
    this.getClusters();
  }

  getClusters() {
    this.clusters = [
      {
        Uid: '54557765654445',
        Name: 'adfa',
        Online: true,
        IsBurning: true,
        Warning: false,
        Malfunction: false,
        imgUrl: ''
      },
      {
        Uid: '54557765654445',
        Name: 'adsfadfw',
        Online: true,
        IsBurning: true,
        Warning: true,
        Malfunction: false,
        imgUrl: ''
      },
      {
        Uid: '54557765654445',
        Name: 'adfa',
        Online: true,
        IsBurning: false,
        Warning: false,
        Malfunction: true,
        imgUrl: ''
      },
      {
        Uid: '54557765654445',
        Name: 'adsfadfw',
        Online: false,
        IsBurning: true,
        Warning: false,
        Malfunction: false,
        imgUrl: ''
      }
    ];
    this.totalItems = 23;
    for (let i = 0; i < this.clusters.length; i++) {
      let clu = this.clusters[i];
      if (!clu.imgUrl) {
        clu.imgUrl = 'assets/images/sidenav4.jpg';
      }

      if (clu.Online === true) {
        clu.online = '终端在线';
        if (clu.IsBurning === true) {
          clu.isBurning = '设备运行中';
        } else {
          clu.isBurning = '设备未运行';
        }
        if (clu.Warning === true) {
          clu.warning = '有告警';
        } else {
          clu.warning = '无告警';
        }
        if (clu.Malfunction === true) {
          clu.malfunction = '有故障';
        } else {
          clu.malfunction = '无故障';
        }
      } else {
        clu.online = '终端离线';
        clu.isBurning = '设备未运行';
        clu.warning = '无告警';
        clu.malfunction = '无故障';
      }

    }


  }

  pageChange() {

  }

}
