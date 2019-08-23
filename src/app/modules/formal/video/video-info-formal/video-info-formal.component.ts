import { Component, OnInit } from '@angular/core';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {VideoService} from "../../../../shared/video.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ComfirmComponent} from "../../../directives/alert/comfirm/comfirm.component";
import {VideoEditFormalComponent} from "../modals/video-edit-formal/video-edit-formal.component";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-video-info-formal',
  templateUrl: './video-info-formal.component.html',
  styleUrls: ['./video-info-formal.component.css']
})
export class VideoInfoFormalComponent implements OnInit {
  public uid;
  public basic;
  public operate;
  public expand;
  tplModal: NzModalRef;
  public listPage;


  constructor(private videoService: VideoService,
              private route: ActivatedRoute,
              public router: Router,
              private modalService: NgbModal,
              private nzModal: NzModalService) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.listPage = this.route.snapshot.paramMap.get('page');
    /*this.basic = {
      status: 1
    };*/

    this.getBasic();
    this.getOperate();
    this.getExpand();
  }

  // 获取基础信息
  getBasic() {
    this.videoService.getBasic(this.uid)
      .subscribe(data => {
        this.basic = data;
      }, err => {

      });
  }


  // 获取扩展应用
  getExpand() {
    this.videoService.getExpand(this.uid)
      .subscribe(data => {
        this.expand = data.data;
      }, err => {

      });
  }


  // 获取记录信息
  getOperate() {
    this.videoService.getOperate(this.uid)
      .subscribe(data => {
        this.operate = data;
      }, err => {

      });
  }

  // 编辑基础信息模态框
  editBasic() {
    let that = this;
    const modalRef = this.modalService.open(VideoEditFormalComponent, {windowClass: 'modal_md', centered: true});
    modalRef.componentInstance.currentData = this.basic;
    modalRef.componentInstance.uid = this.uid;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.getBasic();
        that.getOperate();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }

  // 终端报废模态框
  /*scrap() {
    let that = this;
    const modalRef = this.modalService.open(VScrapAdComponent, {windowClass: 'modal_md', centered: true});
    modalRef.componentInstance.currentData = this.basic;
    modalRef.componentInstance.uid = this.uid;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.getBasic();
        that.getOperate();
      }
    }, (reason) => {
      console.log(reason);
    });
  }*/


  // 维修
  repair() {
    let that = this;
    let title = '确认要维修此视频吗？';
    let subtitle = '';
    this.creatModal(title, subtitle, () => {
      this.videoService.repair(this.uid)
        .subscribe(val => {
          Swal(
            '操作成功！',
            '',
            'success'
          );
          that.getBasic();
          that.getOperate();
          that.getExpand();
        }, err => {
          Swal(
            err.message || err,
            '',
            'error'
          );
        });
    });

  }


  // 删除
  deleteData() {
    let title = '确认要删除此视频吗？';
    let subtitle = '';
    this.creatModal(title, subtitle, () => {
      this.checkBatch( [this.uid]);
    });
  }


  creatModal(title, subtitle, call) {
    const that = this;
    this.tplModal = this.nzModal.confirm({
      nzTitle: title,
      nzContent: subtitle,
      nzIconType: 'fill:question-circle',
      nzOnOk: () => {
        call();
        that.tplModal.destroy();
      }
    });
  }

  // 发送批量操作请求
  checkBatch( checked) {
    let that = this;
    let post = {
      data: checked
    };

    this.videoService.deleteData(post)
      .subscribe(val => {
        Swal(
          '操作成功！',
          '',
          'success'
        );
        that.router.navigate(['/admin/ad/video/list']);
      }, err => {
        Swal(
          err.message || err,
          '',
          'error'
        );
      });
  }

}
