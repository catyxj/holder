import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TemplateService} from "../../../../../../shared/template.service";

@Component({
  selector: 'app-temp-add-calc1',
  templateUrl: './temp-add-calc1.component.html',
  styleUrls: ['./temp-add-calc1.component.css']
})
export class TempAddCalc1Component implements OnInit {
  public uid;
  public code;
  public checked;
  public channelList = [];
  public selectedValue;
  public radioValue;
  public value;

  constructor(public activeModal: NgbActiveModal,
              private templateService: TemplateService) { }

  ngOnInit() {
  }

  save() {
    let that = this;
    that.activeModal.close('ok');
  }

}
