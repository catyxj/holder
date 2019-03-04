import {Component, OnDestroy, OnInit} from '@angular/core';
import {VideoViewComponent} from "../../../video/video-view/video-view.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BoilerService} from "../../../../shared/boiler.service";

declare var EZUIPlayer: any;

@Component({
  selector: 'app-v-dashboard',
  templateUrl: './v-dashboard.component.html',
  styleUrls: ['./v-dashboard.component.css']
})
export class VDashboardComponent implements OnInit, OnDestroy {
  public uid;
  public name;
  public players = [];
  public urlList = [];
  public totalItems;
  public pageSize = 6;
  public page = 1;

  constructor(private boilerService: BoilerService) { }

  ngOnInit() {
    this.uid = sessionStorage.getItem('runtimeUid');
    this.name = sessionStorage.getItem('runtimeName');
    this.getDataList();

    // this.players[0] = new EZUIPlayer('myPlayer');
  }

  getDataList() {

    this.boilerService.getBoiler(this.uid)
      .subscribe( data => {
        // let ept = data;
        this.urlList = data.Camera;
        this.totalItems = this.urlList.length;

        setTimeout(() => {
          for (let i = 0; i < this.urlList.length; i++) {
            this.players[i] = new EZUIPlayer('myPlayer' + i);
          }
        }, 500);
      });

    /*this.urlList = [
      {
        id: 1,
        url: 'http://hls.open.ys7.com/openlive/691df6192a414a9b99c00743dafa2e9d.hd.m3u8',
        name: '秦山村污水监控室',
        code: 'asdfa22222'
      },
      {
        id: 2,
        url: 'http://hls.open.ys7.com/openlive/94e75e287b1a4e66a67238fe8e646bcb.hd.m3u8',
        name: 'aasdf3rt',
        code: 'asdfg65yrtey'
      },
      {
        id: 3,
        url: 'http://hls.open.ys7.com/openlive/16752eaddb9346e89f94613203565cba.hd.m3u8',
        name: 'asdfafasdfa',
        code: 'as325576587'
      },
      {
        id: 4,
        url: 'http://hls.open.ys7.com/openlive/28e42a38c3fa4835abb59c2e072a2634.hd.m3u8',
        name: 'sdsssssssssss',
        code: 'as325576587'
      },
      {
        id: 5,
        url: 'http://hls.open.ys7.com/openlive/691df6192a414a9b99c00743dafa2e9d.hd.m3u8',
        name: 'sdsssssssssss',
        code: 'as325576587'
      }
    ];
    this.totalItems = 12;*/


  }

  pageChange() {

  }


  ngOnDestroy() {
    this.players = null;
  }

}
