import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {LifeService} from "../../../../shared/life.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-life-edit',
  templateUrl: './life-edit.component.html',
  styleUrls: ['./life-edit.component.css']
})
export class LifeEditComponent implements OnInit {
  @Input()
  uid;
  currentData;

  public name;
  public date;
  public period;

  constructor(public activeModal: NgbActiveModal,
              private lifeService: LifeService) { }

  ngOnInit() {
    console.log(this.currentData);
    this.name = this.currentData.name;
    this.date = this.currentData.CreatedDate;
    this.period = this.currentData.period;
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }


  save() {
    const post = {
      uid: this.uid,
      name: this.name,
      date: this.date,
      period: this.period
    };
    console.log(post);
    this.lifeService.edit(post)
      .subscribe( val => {
        Swal(
          '更新成功！',
          '',
          'success'
        );
        this.activeModal.close('ok');
      }, err => {
        Swal(
          '更新失败！',
          '',
          'error'
        );
      });
  }


}
