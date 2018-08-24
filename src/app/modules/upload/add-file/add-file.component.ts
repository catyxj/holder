import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NzMessageService, UploadFile} from "ng-zorro-antd";
import {HttpClient, HttpErrorResponse, HttpRequest, HttpResponse} from "@angular/common/http";
import {catchError, filter} from "rxjs/internal/operators";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {OrganizationService} from "../../../shared/organization.service";
import Swal from 'sweetalert2';
import {throwError} from "rxjs/index";
import {UploadService} from "../../../shared/upload.service";

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddFileComponent implements OnInit {

  public org;
  public orgList;
  public uploading = false;
  public fileList: UploadFile[] = [];

  constructor(private http: HttpClient,
              public activeModal: NgbActiveModal,
              private orgService: OrganizationService,
              private uploadService: UploadService) { }

  ngOnInit() {
    this.getOrg();
  }


  getOrg() {
    this.orgService.getOrgList()
      .subscribe( data => {
        this.orgList = data;
      });
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

    this.uploadService.uploadFile(formData)
      .subscribe(
        (event: {}) => {
          this.uploading = false;
          Swal(
            '上传成功！',
            '',
            'success'
          );
        },
        err => {
          this.uploading = false;
          Swal(
            '上传失败！',
            err,
            'error'
          );
        }
      );
  }




}
