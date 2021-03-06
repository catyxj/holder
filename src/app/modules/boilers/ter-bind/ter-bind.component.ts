import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BoilerService} from '../../../shared/boiler.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-ter-bind',
  templateUrl: './ter-bind.component.html',
  styleUrls: ['./ter-bind.component.css']
})
export class TerBindComponent implements OnInit {

  @Input()
  currentData: any;
  id: any;

  public terminal: string;

  constructor(public activeModal: NgbActiveModal,
              private boilerService: BoilerService) { }

  ngOnInit() {
  }


  save() {
    let data = {
      equipment_id: this.currentData.Uid,
      terminal_code: this.terminal,
      terminal_set_id: this.id
    };
    this.boilerService.terBind(data)
      .subscribe(val => {
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
