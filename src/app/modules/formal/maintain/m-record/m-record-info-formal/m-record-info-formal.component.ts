import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MaintainService} from "../../../../../shared/maintain.service";

@Component({
  selector: 'app-m-record-info-formal',
  templateUrl: './m-record-info-formal.component.html',
  styleUrls: ['./m-record-info-formal.component.css']
})
export class MRecordInfoFormalComponent implements OnInit {

  public uid;
  public info;
  public dataList = [ ];

  previewImage: string | undefined = '';
  previewVisible = false;

  public listPage;

  constructor(private route: ActivatedRoute,
              private maintainService: MaintainService) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.listPage = this.route.snapshot.paramMap.get('page');
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

}
