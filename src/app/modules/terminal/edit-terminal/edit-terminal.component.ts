import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TerminalService} from '../../../shared/terminal.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-terminal',
  templateUrl: './edit-terminal.component.html',
  styleUrls: ['./edit-terminal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EditTerminalComponent implements OnInit {
  @Input()
  currentData: any;

  public data;
  public editing;
  public editingCode;
  public bin;
  public bins;

  constructor(public activeModal: NgbActiveModal,
              private terminalService: TerminalService) { }

  ngOnInit() {
    console.log(this.currentData);
    this.editing = true;
    this.data = {
      code: this.currentData.Sn,
      org: this.currentData.OrganizationName,
    };
    this.getBin();
  }



  // 重置终端编码
  resetCode() {
    this.editingCode = true;
  }

  // bin文件选择
  getBin() {
    this.terminalService.getBin()
      .subscribe( bin => {
        this.bins = bin;
      });
  }

  // 升级
  upgrade() {
    this.terminalService.upgrade(this.bin)
      .subscribe( () => {
        Swal(
          '升级成功！',
          '',
          'success'
        );
      }, err => {
        Swal(
          '升级失败！',
          err,
          'error'
        );
      });
  }

  // 重启
  restart() {
    this.terminalService.restart(this.data.code)
      .subscribe( val => {
        Swal(
          '重启成功！',
          '',
          'success'
        );
      }, err => {
        Swal(
          '重启失败！',
          err,
          'error'
        );
      });
  }

  // 保存
  save() {
    let data = {
      code: this.data.code,
      org: this.data.org
    };

    this.terminalService.editTerminal(data)
      .subscribe( val => {
        Swal(
          '保存成功！',
          '',
          'success'
        );
        this.activeModal.close('ok');
      }, err => {
        Swal(
          '保存失败！',
          err,
          'error'
        );
      });

  }

}
