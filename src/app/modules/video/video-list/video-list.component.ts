import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../../shared/user.service';
import {VideoService} from "../../../shared/video.service";
import Swal from 'sweetalert2';
import {VideoAddComponent} from "../video-add/video-add.component";
import {VideoConfigComponent} from "../video-config/video-config.component";
import {VideoViewComponent} from "../video-view/video-view.component";

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
  public user;
  public videoLists;
  public page = 1;
  public totalItems = 0;
  public search: string;
  public deleteList = [];
  public allDelete = false;
  public pageSize = 10;
  public isSpinning = false;
  public isLoading = false;

  constructor(private modalService: NgbModal,
              private userService: UserService,
              private videoService: VideoService
              ) {
    this.userService.userStatus$ // 监测父组件user
      .subscribe( data => {
          this.user = data;
        }
      );
  }

  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.user = user;
    this.getlists();

    // this.getTest();
  }

  // 获取列表
  getlists() {
    // this.isSpinning = true;
    this.videoService.getLists(this.page, this.pageSize, this.search)
      .subscribe( data => {
        this.isSpinning = false;
        this.videoLists = data.params;
        this.totalItems = data.counts;
      }, err => {
        this.isSpinning = false;
      });
  }

  getTest() {
    this.videoLists = [
      {
        Uid: 'afdasf',
        Name: 'asdfasdf',
        Remark: 'asdf',
        Online: true,
        CheckOn: true,
        SerialName: 'asdfsa',
        SerialNumber: 1,
        EptUid: 'asdfa',
        OrgUid: 'asdfa',
        LiveAddress: 'http://hls.open.ys7.com/openlive/691df6192a414a9b99c00743dafa2e9d.hd.m3u8'
      },
      {
        Uid: 'afdasf11111',
        Name: 'asdfasdfasdfa',
        Online: true,
        CheckOn: false,
        Remark: 'asdASDFAf',
        SerialName: 'asdfsdw33a',
        SerialNumber: 2,
        EptUid: 'asdfa',
        OrgUid: 'asdfa',
        LiveAddress: 'http://hls.open.ys7.com/openlive/94e75e287b1a4e66a67238fe8e646bcb.hd.m3u8'
      }
    ];
    this.totalItems = 12;
  }


  // 批量选择
  checkDel(data): void {
    if ( data.checkDelete === true) {
      this.deleteList.push(data.Uid);
    } else {
      for (let i = 0; i < this.deleteList.length; i++) {
        const dl = this.deleteList[i];
        if (dl === data.Uid) {
          this.deleteList.splice(i, 1);
        }
      }
    }
    // console.log(this.deleteList);
  }

  // 全选
  allDel() {
    if (this.allDelete === true) {
      for (let i = 0; i < this.videoLists.length; i++) {
        this.videoLists[i].checkDelete = true;
        this.deleteList.push(this.videoLists[i].Uid);
      }
    } else {
      for (let i = 0; i < this.videoLists.length; i++) {
        this.videoLists[i].checkDelete = false;
        // this.deleteList.splice(i, 1);
      }
      this.deleteList = [];
    }
  }

  // 批量删除
  deleteG() {
    const cf = confirm(`确认删除选中内容 ？`);
    if (cf === true) {
      this.isLoading = true;
      this.videoService.deleteData(this.deleteList)
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
    if (typeof(this.pageSize) !== 'number') {
      this.pageSize = parseInt(this.pageSize);
    }
    this.pageChange();
  }

  // 页码变化
  pageChange(): void {
    this.getlists();
    this.allDelete = false;
    this.deleteList = [];
  }

  // 搜索
  searchChange() {
    this.page = 1;
    this.pageChange();
  }

  // 查看
  viewData(data) {
    const modalRef = this.modalService.open(VideoViewComponent);
    modalRef.componentInstance.currentData = data;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        this.pageChange();
      }
    }, (reason) => {

      console.log(reason);
    });
  }

  // 设置
  editData(data) {
    const modalRef = this.modalService.open(VideoConfigComponent);
    modalRef.componentInstance.currentData = data;
    modalRef.componentInstance.currentUser = this.user;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        this.pageChange();
      }
    }, (reason) => {

      console.log(reason);
    });
  }

  // 添加
  newData() {
    const modalRef = this.modalService.open(VideoAddComponent);
    modalRef.componentInstance.currentUser = this.user;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        this.pageChange();
      }
    }, (reason) => {

      console.log(reason);
    });
  }


}
