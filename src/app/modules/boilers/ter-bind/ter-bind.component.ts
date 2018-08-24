import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BoilerService} from '../../../shared/boiler.service';
import {NzMessageService} from "ng-zorro-antd";


@Component({
  selector: 'app-ter-bind',
  templateUrl: './ter-bind.component.html',
  styleUrls: ['./ter-bind.component.css']
})
export class TerBindComponent implements OnInit {

  @Input()
  currentData: any;

  public terminal: string;

  constructor(public activeModal: NgbActiveModal,
              private boilerService: BoilerService,
              private message: NzMessageService) { }

  ngOnInit() {
  }


  save() {
    let data = {
      equipment_id: this.currentData.Uid,
      terminal_code: this.terminal
    };
    this.boilerService.terBind(data)
      .subscribe(val => {
        alert('保存成功');
        this.activeModal.close('ok');
      }, err => {
        // this.message.error(err);
        alert(err);
      });
  }

}
