import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LifeService} from '../../../../shared/life.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-life-add',
  templateUrl: './life-add.component.html',
  styleUrls: ['./life-add.component.css']
})
export class LifeAddComponent implements OnInit {
  @Input()
  uid;

  public name;
  public date;
  public period;

  constructor(public activeModal: NgbActiveModal,
              private lifeService: LifeService) { }

  ngOnInit() {
  }


  numberVal() {
    if (! /^\d+$/.test(this.period)) {
      this.period = 0;
    }
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }


  save() {
    this.date.setHours(0, 0, 0, 0);
    const post = {
      uid: this.uid,
      name: this.name,
      installDate: this.date,
      expireTime: this.period
    };
    console.log(post);
    this.lifeService.add(post)
      .subscribe( val => {
        Swal(
          '添加成功！',
          '',
          'success'
        );
        this.activeModal.close('ok');
      }, err => {
        Swal(
          '添加失败！',
          err,
          'error'
        );
      });
  }

}
