import {Component, Input, OnInit} from '@angular/core';
import {MaintainService} from "../../../../../../shared/maintain.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";

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

    this.name = 'aaaaa';
    this.getInfo();
  }


  getInfo() {
    this.tList = [
      {
        info: 'aaa'
      },
      {
        info: 'vvv'
      },
      {
        info: 'bbb'
      }
    ];
  }

  addItem() {
    this.tList.push({
      info: ''
    });
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
        console.log('aa');
        that.tplModal.destroy();
      }

    });
  }

  save() {
    let that = this;
    let post = {

    };
    /*this.maintainService.addData(post)
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
      });*/
  }


}
