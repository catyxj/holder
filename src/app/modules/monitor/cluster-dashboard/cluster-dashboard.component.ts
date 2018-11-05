import {Component, OnDestroy, OnInit} from '@angular/core';
import {BoilerSocketService} from "../../../shared/boiler-socket.service";

@Component({
  selector: 'app-cluster-dashboard',
  templateUrl: './cluster-dashboard.component.html',
  styleUrls: ['./cluster-dashboard.component.css']
})
export class ClusterDashboardComponent implements OnInit, OnDestroy {

  clusters: any = [];
  page = 1;
  pageSize = 2;
  totalItems = 0;
  search: string;
  socket: any;

  constructor(private boilerWsService: BoilerSocketService) { }

  ngOnInit() {
    let data = {
      page: this.page,
      search: this.search,
      pageSize: this.pageSize
    };
    this.getClusters(data);
  }

  getClusters(message) {

    const wsUrl = `wss://${window.location.host}/clusters_show`;
    this.socket = this.boilerWsService.creatSocket(wsUrl, message)
      .subscribe(
        data => {
          let clusters = JSON.parse(data);
          // console.log(equips);
          this.totalItems = clusters.counts;
          this.clusters = clusters.cst;
          if (!this.clusters) {
            this.clusters = [];
          }
          for (let i = 0; i < this.clusters.length; i++) {
            let clu = this.clusters[i];
            if (!clu.img) {
              clu.img = 'assets/images/sidenav4.jpg';
            }

          }

        },
        err => console.log(err),
        () => console.log('ws结束')
      );

    /*this.clusters = [
      {
        uid: '54557765654445',
        name: 'adfa',
        termOnline: 11,
        termOffline: 22,
        alarmCounts: 2,
        eptOnline: 11,
        img: ''
      },
      {
        uid: '54557765654445',
        name: 'adsfadfw',
        termOnline: 22,
        termOffline: 33,
        alarmCounts: 2,
        eptOnline: 3,
        img: ''
      }
    ];
    this.totalItems = 23;

    for (let i = 0; i < this.clusters.length; i++) {
      let clu = this.clusters[i];
      if (!clu.img) {
        clu.img = 'assets/images/sidenav4.jpg';
      }
    }*/




  }

  // 页码变化
  pageChange() {
    this.socket.unsubscribe();
    this.boilerWsService.closeSocket();
    this.getClusters({page: this.page, search: this.search, pageSize: this.pageSize});
  }

  // 搜索
  searchChange() {
    this.page = 1;
    this.pageChange();
  }

  trackByUid(index, item) {
    return item.uid;
  }

  ngOnDestroy() {
    this.socket.unsubscribe();
    this.boilerWsService.closeSocket();
  }


}
