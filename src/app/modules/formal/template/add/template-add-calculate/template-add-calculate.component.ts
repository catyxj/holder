import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-template-add-calculate',
  templateUrl: './template-add-calculate.component.html',
  styleUrls: ['./template-add-calculate.component.css']
})
export class TemplateAddCalculateComponent implements OnInit {
  @Output()
  next = new EventEmitter();
  @Input()
  uid;

  constructor() { }

  ngOnInit() {
  }

  pre() {
    this.next.emit(-1);
  }

  goNext() {
    this.next.emit(1);
  }

  save() {
    let that = this;
    let post;
    /*post = {
      baud_rate: parseInt(this.baudRate),
      data_bit: parseInt(this.dataBit),
      stop_bit: parseInt(this.stopBit),
      parity_bit: parseInt(this.parity),
      heart_beat: parseInt(this.heartbeat),
      cmt_type: parseInt(this.correspond),
      data_type: parseInt(this.dataType)
    };*/
    console.log(post);
    this.next.emit(1);

    /*this.templateService.updateBasic(post)
      .subscribe(val => {
        Swal(
          '操作成功！',
          '',
          'success'
        );
        this.next.emit(1);
      }, err => {
        Swal(
          err.message,
          '',
          'error'
        );
      });*/


  }

}
