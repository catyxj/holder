import {Component, Input, OnInit} from '@angular/core';
import {MaintainService} from "../../../../../../shared/maintain.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-m-template-edit-f',
  templateUrl: './m-template-edit-f.component.html',
  styleUrls: ['./m-template-edit-f.component.css']
})
export class MTemplateEditFComponent implements OnInit {
  @Input()
  currentData;

  public name;
  public tList = [];
  public edit;

  tplModal: NzModalRef;

  constructor(private maintainService: MaintainService,
              public activeModal: NgbActiveModal,
              private nzModal: NzModalService) { }

  ngOnInit() {

    this.name = this.currentData.name;
    this.getInfo();
  }


  getInfo() {
    // this.tList = [
    //   {
    //     info: 'aaa'
    //   },
    //   {
    //     info: 'vvv'
    //   },
    //   {
    //     info: 'bbb'
    //   }
    // ];

    this.maintainService.getTempInfo(this.currentData.id)
      .subscribe(data => {
        // this.name = data.name;
        this.tList = data.info;
      }, err => {

      });

  }

  addItem() {
    this.tList.push('');
  }

  changeItem(data, i) {
    this.tList[i] = data;
  }

  editD() {
    this.edit = !this.edit;
  }

  deleteData() {
    let that = this;
    this.tplModal = this.nzModal.confirm({
      nzTitle: '确认要删除此模板？',
      nzContent: '',
      nzIconType: 'fill:question-circle',
      nzOnOk: () => {
        that.tplModal.destroy();
        let post = {
          data: [this.currentData.id]
        };
        // that.loading = true;
        that.maintainService.deleteTempData(post)
          .subscribe(val => {
            // that.loading = false;
            Swal(
              '操作成功！',
              '',
              'success'
            );
            that.activeModal.close('ok');
          }, err => {
            // that.loading = false;
            Swal(
              err.message || err,
              '',
              'error'
            );
          });

      }

    });
  }

  save() {
    let that = this;
    let post = {
      id: this.currentData.id,
      name: this.name,
      info: this.tList
    };
    this.maintainService.updateTemp(post)
      .subscribe(val => {
        Swal(
          '操作成功！',
          '',
          'success'
        );
        that.activeModal.close('ok');
      }, err => {
        Swal(
          err.message || err,
          '',
          'error'
        );
      });
  }


}
