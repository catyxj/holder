import { Component, OnInit } from '@angular/core';
import {ServiceService} from "../../../../shared/service.service";
import {ActivatedRoute} from "@angular/router";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-detail-formal',
  templateUrl: './service-detail-formal.component.html',
  styleUrls: ['./service-detail-formal.component.css']
})
export class ServiceDetailFormalComponent implements OnInit {
  public uid;
  public basic;
  public account;
  public comments = [];
  public message;
  public page = 1;
  public pageSize = 4;
  public totalItems;
  public listPage;

  public fileList = []; // 上传文件列表
  public headOption;

  constructor(private serviceService: ServiceService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.listPage = this.route.snapshot.paramMap.get('page');
    /*this.basic = {
      account_name: '',
      created_at: '0001-01-01T00:00:00Z',
      org_name: 'aaaaa',
      status: 2,
      type: 2,
      uid: '5bb20125-a3c2-11e9-a701-7cd30abeae02',
      username: 'qqq',
      value: '的是非得失'
    };*/


    this.getBasic();
    this.getComments();
    const token = localStorage.getItem('authToken');
    this.headOption = {
      'Authorization': token
    };
  }


  // 获取基础信息
  getBasic() {
    this.serviceService.getBasicF(this.uid)
      .subscribe(data => {
        this.basic = data;
        this.account = this.hidden(this.basic.username, 2, 4);
      }, err => {

      });
  }

  // 获取留言列表
  getComments() {
    /*this.comments = [
      {
        account_name: '金婷婷加上安静了家里水电',
        attach: [
          {
            name: '管理者.rar',
            oss_path: 'http://lukeep.oss-cn-shanghai.aliyuncs.com/dialogue/f1b6d175-5e9c-4e07-9a9c-85ceda9bb277.rar'
          }
        ],
        created_at: '2019-07-17T16:39:11+08:00',
        org_name: 'dd',
        username: 'admin',
        value: 'a',
      },
      {
        account_name: '系统管理员',
        attach: [],
        created_at: '2019-07-16T16:48:08+08:00',
        org_name: 'dd',
        username: 'admin',
        value: 'sss'
      }
    ];
    this.totalItems = 25;
    for (let i = 0; i < this.comments.length; i++) {
      let com = this.comments[i];
      com.username2 = this.hidden(com.username, 3, 4);
    }*/


    this.serviceService.getCommentsF(this.uid, this.page, this.pageSize)
      .subscribe(data => {
        this.comments = data.data;
        this.totalItems = data.count;
        for (let i = 0; i < this.comments.length; i++) {
          let com = this.comments[i];
          com.username2 = this.hidden(com.username, 2, 4);
        }
      }, err => {

      });

  }

  beforeUpload = (file: File) => {
    console.log(file);
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Swal(
        '上传失败',
        '上传的文件不能超过2M，请重新上传',
        'error'
      );
      return false;
    }
    return true;
  }



  // 文件上传状态改变
  handleChange(info: any): void {
    console.log(info);
    const fileList = info.fileList;
    // 2. read from response and show file link
    if (info.file.response) {
      info.file.id = info.file.response.id;
    }
    if (info.file.status === 'error') {
      Swal(
        '网络错误，请检查网络',
        info.file.message,
        'error'
      );
      return;
    }
    // 3. filter successfully uploaded files according to response from server
    // tslint:disable-next-line:no-any
    this.fileList = fileList.filter((item: any) => {
      // if (item.response) {
      //   return item.response.status === 'success';
      // }
      if (item.status === 'error') {
        return false;
      } else {
        return true;
      }
      // return true;

    });
  }


  // 提交
  save() {
    const that = this;
    console.log(this.fileList);
    let files = '';
    for (let i = 0; i < this.fileList.length; i++) {
      files += this.fileList[i].response.id + ',';
    }
    const post = {
      uid: this.uid,
      value: this.message,
      attach: files
    };
    this.serviceService.updateCommentF(post)
      .subscribe(val => {
        Swal(
          '提交成功',
          '',
          'success'
        );
        that.message = '';
        that.fileList = [];
        that.getBasic();
        that.getComments();
      }, err => {
        Swal(
          err.message || err,
          '',
          'error'
        );
      });
  }


  // 隐藏字符
  hidden(str, frontLen, endLen) {
    const len = str.length - frontLen - endLen;
    if (len <= 2) {
      let xing = '';
      for (let i = 0; i < str.length - 1; i++) {
        xing += '*';
      }
      return str.substring(0, 1) + xing;
      // return '***';
    }
    let xing = '';
    for (let i = 0; i < len; i++) {
      xing += '*';
    }
    return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
  }

}
