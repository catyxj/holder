import { Component, OnInit } from '@angular/core';
import {UploadFile} from 'ng-zorro-antd/upload';
import {ServiceService} from '../../../shared/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ser-view',
  templateUrl: './ser-view.component.html',
  styleUrls: ['./ser-view.component.css']
})
export class SerViewComponent implements OnInit {
  private uid;
  public data;
  public fileList: UploadFile[] = [];
  public replyList = [];
  public replyContent;

  constructor(private serviceService: ServiceService) { }

  ngOnInit() {
    this.data = {
      id: 111,
      content: 'asfdsafxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx惺惺惜惺惺想寻寻寻寻',
      classify: 'asdf',
      submitor: 'asdfsaf',
      date: '2018-11-1',
      status: true
    };

    this.getList();

  }


  getList() {
    this.serviceService.getComment(this.uid)
      .subscribe(data => {
        this.replyList = data;
      }, err => {

      });


    this.replyList = [
      {
        user: 'asdfa',
        content: 'xxxxxxxxxxxxxx',
        date: '2018-11-12 14:22:33'
      },
      {
        user: 'eeessssss',
        content: 'xxxxxxxxxxxxxxxxxxxx',
        date: '2018-12-12 14:22:33'
      }
    ];
  }



  beforeUpload = (file: UploadFile): boolean => {
    this.fileList.push(file);
    return false;
  }



  submit() {
    console.log(this.replyContent);


    const formData = new FormData();
    // tslint:disable-next-line:no-any

    formData.append('feedback', this.replyContent);

    this.fileList.forEach((file: any) => {
      formData.append('files[]', file);
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



  }


}
