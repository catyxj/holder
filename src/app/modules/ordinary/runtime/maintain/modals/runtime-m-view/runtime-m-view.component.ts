import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

import Swal from 'sweetalert2';
import {MaintainService} from "../../../../../../shared/maintain.service";

@Component({
  selector: 'app-runtime-m-view',
  templateUrl: './runtime-m-view.component.html',
  styleUrls: ['./runtime-m-view.component.css']
})
export class RuntimeMViewComponent implements OnInit {
  @Input()
  currentData;

  public uid;
  public info;

  public dataList = [];

  previewImage: string | undefined = '';
  previewVisible = false;

  public listPage;

  constructor(public activeModal: NgbActiveModal,
              private maintainService: MaintainService) { }

  ngOnInit() {
    this.uid = this.currentData.id;
    this.getInfo();
  }

  getInfo() {
    /*this.dataList = [
      {
        description: '通风口是否正常',
        status: false,
        remark: '',
        imgList: []
      },
      {
        description: '点火器是否正常',
        status: true,
        remark: '',
        imgList: []
      },
      {
        description: '排风机是否正常',
        status: true,
        remark: '',
        imgList: []
      }
    ];*/


    this.maintainService.getLogInfo(this.uid)
      .subscribe(data => {
        this.info = data;
        this.dataList = data.info;

      }, err => {

      });
  }

  // 缩略图
  preview(img) {
    this.previewImage = img;
    this.previewVisible = true;
  }

  save() {

  }

}
