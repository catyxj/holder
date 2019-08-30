import { Component, OnInit } from '@angular/core';
import {VideoService} from "../../../../../shared/video.service";

@Component({
  selector: 'app-runtime-video',
  templateUrl: './runtime-video.component.html',
  styleUrls: ['./runtime-video.component.css']
})
export class RuntimeVideoComponent implements OnInit {
  public uid;
  public dataList = [];

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.uid = sessionStorage.getItem('runtimeUid');
    this.getList();
  }

  getList() {
    /*this.dataList = [
      {
        uid: 'aaaaadads122',
        name: 'hhhahahah',
        serial_number: 'asdfa',
        console: false
      },
      {
        uid: 'aaaaawqe454523dfsf',
        name: 'h哈哈哈哈h',
        serial_number: '1e4t54fddsgf',
        console: true
      },
      {
        uid: 'aaaaadads122',
        name: 'hasdfadsfahah',
        serial_number: 'asdfa',
        console: false
      },
      {
        uid: 'aaaaawqe454523dfsf',
        name: '回家来了',
        serial_number: '1e4t54fddsgf',
        console: true
      },
      {
        uid: 'aaaaawqe454523dfsf',
        name: '回家来了',
        serial_number: '1e4t54fddsgf',
        console: true
      }
    ];*/

    this.videoService.getEptList(this.uid)
      .subscribe(data => {
          this.dataList = data;
      }, err => {

      });
  }

}
