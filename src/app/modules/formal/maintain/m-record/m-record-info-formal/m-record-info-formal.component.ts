import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-m-record-info-formal',
  templateUrl: './m-record-info-formal.component.html',
  styleUrls: ['./m-record-info-formal.component.css']
})
export class MRecordInfoFormalComponent implements OnInit {
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

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.listPage = this.route.snapshot.paramMap.get('page');
  }



  // 缩略图
  preview(img) {
    this.previewImage = img;
    this.previewVisible = true;
  }

}
