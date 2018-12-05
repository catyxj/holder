import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MaintainService} from '../../../shared/maintain.service';
import {Boiler} from "../../../boiler";
import {BoilerService} from "../../../shared/boiler.service";

@Component({
  selector: 'app-add-maintain',
  templateUrl: './add-maintain.component.html',
  styleUrls: ['./add-maintain.component.css']
})
export class AddMaintainComponent implements OnInit {
  public data;
  public selectedValue: string;
  public equips = [];
  public info;

  constructor(public activeModal: NgbActiveModal,
              private maintainService: MaintainService,
              private boilerService: BoilerService) { }

  ngOnInit() {
    this.getEquip();
  }

  getEquip() {
    this.boilerService.getBoilers(1, 10)
      .subscribe( data => {
        this.equips = data.params;
      });
  }


  // 自动完成
  /*onInput(value: string): void {
    if (value) {
      this.boilerService.getBoilers(1, 10, value)
        .subscribe(data => {
          this.equips = data.params;
        });
    } else {
      this.equips = [];
    }
  }*/

}
