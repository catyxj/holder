import { Component, OnInit } from '@angular/core';
import {NzMessageService, UploadFile} from "ng-zorro-antd";
import {HttpClient, HttpRequest, HttpResponse} from "@angular/common/http";
import {filter} from "rxjs/internal/operators";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.css']
})
export class AddFileComponent implements OnInit {

  public org;
  public uploading = false;
  public fileList: UploadFile[] = [];

  constructor(private http: HttpClient,
              public activeModal: NgbActiveModal,
              private msg: NzMessageService) { }

  ngOnInit() {
  }


  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = [file];
    return false;
  }

  handleUpload(): void {
    const formData = new FormData();
    formData.append('org', this.org);

    this.fileList.forEach((file: any) => {
      formData.set('files', file);
    });
    this.uploading = true;
    // You can use any AJAX library you like
    const req = new HttpRequest('POST', '/posts/', formData, {
      reportProgress: true
    });
    this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        (event: {}) => {
          this.uploading = false;
          this.msg.success('upload successfully.');
        },
        err => {
          this.uploading = false;
          this.msg.error('upload failed.');
        }
      );
  }
}
