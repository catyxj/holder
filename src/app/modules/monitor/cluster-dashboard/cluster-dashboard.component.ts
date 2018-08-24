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
  pageSize = 4;
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

    const wsUrl = `ws://${window.location.host}/clusters_show`;
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
        Uid: '54557765654445',
        Name: 'adfa',
        Online: true,
        IsBurning: true,
        Warning: false,
        Malfunction: false,
        img: ''
      },
      {
        Uid: '54557765654445',
        Name: 'adsfadfw',
        Online: true,
        IsBurning: true,
        Warning: true,
        Malfunction: false,
        img: ''
      },
      {
        Uid: '54557765654445',
        Name: 'adfa',
        Online: true,
        IsBurning: false,
        Warning: false,
        Malfunction: true,
        img: ''
      },
      {
        Uid: '54557765654445',
        Name: 'adsfadfw',
        Online: false,
        IsBurning: true,
        Warning: false,
        Malfunction: false,
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

  pageChange() {

  }

  ngOnDestroy() {
    this.socket.unsubscribe();
    this.boilerWsService.closeSocket();
  }


}
