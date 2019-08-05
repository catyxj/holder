import { Component, OnInit } from '@angular/core';
import {VideoService} from "../../../../shared/video.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {VBasicConfigAdComponent} from "../modals/v-basic-config-ad/v-basic-config-ad.component";
import {VScrapAdComponent} from "../modals/v-scrap-ad/v-scrap-ad.component";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {ComfirmComponent} from "../../../directives/alert/comfirm/comfirm.component";

import Swal from 'sweetalert2';
import {switchMap} from "rxjs/internal/operators";

@Component({
  selector: 'app-v-info-ad',
  templateUrl: './v-info-ad.component.html',
  styleUrls: ['./v-info-ad.component.css']
})
export class VInfoAdComponent implements OnInit {
  public uid;
  public basic;
  public operate;
  public expand;
  tplModal: NzModalRef;
  public listPage;
  public status;

  constructor(private videoService: VideoService,
              private route: ActivatedRoute,
              public router: Router,
              private modalService: NgbModal,
              private nzModal: NzModalService) { }

  ngOnInit() {
    // this.uid = this.route.snapshot.paramMap.get('uid');
    // this.listPage = this.route.snapshot.paramMap.get('page');

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        console.log(params);
        this.uid = params.get('uid');
        this.listPage = params.get('page');
        this.status = params.get('status');
        if (!this.status) {
          this.status = '';
        }
        return (params.get('status') || []);
      })
    ).subscribe();


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
    const modalRef = this.modalService.open(VBasicConfigAdComponent, {windowClass: 'modal_md', centered: true});
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
  scrap() {
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
    let that = this;
    this.tplModal = this.nzModal.create({
      nzTitle: '',
      nzContent: ComfirmComponent,
      nzComponentParams: {
        title: title,
        subtitle: subtitle
      },
      nzMaskClosable: true,
      nzClosable: false,
      nzClassName: 'comfirm_modal',
      nzWidth: 440,
      nzFooter: [
        {
          label: '取消',
          shape: 'default',
          onClick: () => that.tplModal.destroy()
        },
        {
          label: '确定',
          type: 'primary',
          onClick: () => {
            call();
            that.tplModal.destroy();
          }
        }
      ],
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
