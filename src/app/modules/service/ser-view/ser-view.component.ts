import { Component, OnInit } from '@angular/core';
import {UploadFile, UploadFilter} from 'ng-zorro-antd';
import {ServiceService} from '../../../shared/service.service';
import Swal from 'sweetalert2';
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-ser-view',
  templateUrl: './ser-view.component.html',
  styleUrls: ['./ser-view.component.css']
})
export class SerViewComponent implements OnInit {
  private uid;
  public currentData;
  public fileList: UploadFile[] = [];
  public replyList = [];
  public replyContent;
  public fileUid = [];
  public page = 1;
  public pageSize = 10;
  public totalItems = 0;

  constructor(private serviceService: ServiceService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.uid = params.get('uid');
      this.getList();
    } );

    // this.getList();

  }


  getList() {
    this.serviceService.getComment(this.uid, this.page, this.pageSize)
      .subscribe(data => {
        this.currentData = data;
        console.log(this.currentData);
        if (this.currentData && this.currentData.CreatedBy.Username) {
          this.currentData.CreatedBy.Username = this.hidden(this.currentData.CreatedBy.Username, 1, 1);
        }

        if (data.comments) {
          this.replyList = data.comments.params;
          this.totalItems = data.comments.counts;
        }

      }, err => {

      });


    /*this.replyList = [
      {
        user: 'asdfa',
        content: 'xxxxxxxxxxxxxx',
        date: '2018-11-12 14:22:33',
        files: [
          {
            name: 'adfadf'
          },
          {
            name: '23r5asfds'
          }
        ]
      },
      {
        user: 'eeessssss',
        content: 'xxxxxxxxxxxxxxxxxxxx',
        date: '2018-12-12 14:22:33',
        files: [
          {
            name: 'adfadf'
          },
          {
            name: '23r5asfds'
          },
          {
            name: 'adfadfasdf'
          },
          {
            name: '23r5asfdddds'
          },
          {
            name: '23r5adds'
          }
        ]
      }
    ];*/
  }



  // 隐藏字符
  hidden(str, frontLen, endLen) {
    let len = str.length - frontLen - endLen;
    if (len <= 2) {
      return '**';
    }
    let xing = '';
    for (let i = 0; i < len; i++) {
      xing += '*';
    }
    return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
  }


  // 页码改变
  pageChange() {
    this.getList();
  }


  // 文件变化
  fileChange(info: any) {
    console.log(info);
    if (info.type === 'error') {
      Swal(
        '上传失败！',
        info.file.error.message,
        'error'
      );
    }
    const fileList = info.fileList;
    /*if (info.type === 'success' && info.file.response) {
      this.fileUid.push(info.file.response.Uid);
      info.file.fileUid = info.file.response.Uid;
    }*/

    // filter successfully uploaded files according to response from server
    /*this.fileList = fileList.filter(item => {
      return !!item.response;
    });*/
  }

  /*beforeUpload = (file: UploadFile): boolean => {
    this.fileList.push(file);
    return false;
  }*/


  submit() {

    for (let i = 0; i < this.fileList.length; i++) {
      let fl = this.fileList[i];
      if (fl.response) {
        this.fileUid.push(fl.response.Uid);
      }
    }

    let post = {
      uid: this.uid,
      comment: this.replyContent,
      attachment: this.fileUid
    };
    this.serviceService.updateComment(post)
      .subscribe( () => {
        Swal(
          '提交成功！',
          '',
          'success'
        );
        this.replyContent = '';
        this.page = 1;
        this.fileList = [];
        this.fileUid = [];
        this.getList();
      }, err => {
        Swal(
          '提交失败！',
          err,
          'error'
        );
      });
  }


  /*submit() {
    console.log(this.replyContent);
    const formData = new FormData();
    // tslint:disable-next-line:no-any

    formData.append('feedback', this.replyContent);

    let n = 0;
    this.fileList.forEach((file: any) => {
      n++;
      formData.append('file' + n, file);
    });

    this.serviceService.uploadReply(formData)
      .subscribe( data => {
        Swal(
          '上传成功！',
          '',
          'success'
        );
      }, err => {
        Swal(
          '上传失败！',
          err,
          'error'
        );
      });



  }*/


}
