import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TerminalService} from "../../../shared/terminal.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.css']
})
export class GroupAddComponent implements OnInit {

  public terList;
  public org;
  public isLoading = false;

  constructor(public activeModal: NgbActiveModal,
              private terminalService: TerminalService) { }

  ngOnInit() {
    this.terList = [
      {
        start: null,
        end: null
      }
    ];
  }

  addTer() {
    this.terList.push({
      start: null,
      end: null
    });
  }

  removeTer(index) {
    this.terList.splice(index, 1);
  }

  save() {
    let data = {
      org: this.org,
      terminals: []
    };
    for (let i = 0; i < this.terList.length; i++) {
      if (!this.terList[i].start || !this.terList[i].end) {
        continue;
      }
      data.terminals.push(this.terList[i]);
    }
    this.isLoading = true;
    this.terminalService.groupAdd(data)
      .subscribe(val => {
        this.isLoading = false;
        Swal(
          '保存成功！',
          '',
          'success'
        );
        this.activeModal.close('ok');
      }, err => {
        this.isLoading = false;
        Swal(
          '保存失败！',
          err,
          'error'
        );
      });
  }


}
