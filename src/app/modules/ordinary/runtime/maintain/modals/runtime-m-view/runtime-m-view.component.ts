import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-runtime-m-view',
  templateUrl: './runtime-m-view.component.html',
  styleUrls: ['./runtime-m-view.component.css']
})
export class RuntimeMViewComponent implements OnInit {
  public uid;

  public dataList = [
    {
      description: '通风口是否正常',
      status: false,
      remark: '',
      imgList: [
        'assets/images/no_img.jpg',
        'assets/images/no_img.jpg'
      ]
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
    },
    {
      description: '风口是否干净',
      status: false,
      remark: '',
      imgList: []
    },
    {
      description: '炉排速度是否正常',
      status: false,
      remark: '',
      imgList: []
    }
  ];

  previewImage: string | undefined = '';
  previewVisible = false;

  public listPage;

  constructor(public activeModal: NgbActiveModal,) { }

  ngOnInit() {
  }

  // 缩略图
  preview(img) {
    this.previewImage = img;
    this.previewVisible = true;
  }

  save() {

  }

}
