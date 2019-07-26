import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AccountService} from "../../../../../shared/account.service";
import {AdressService} from "../../../../../shared/adress.service";

@Component({
  selector: 'app-account-edit-formal',
  templateUrl: './account-edit-formal.component.html',
  styleUrls: ['./account-edit-formal.component.css']
})
export class AccountEditFormalComponent implements OnInit {
  @Input()
  currentData;
  @Input()
  uid;

  public username;
  public orgName;
  public orgType = 'lucy';
  public email;
  public selectedProvince;
  public selectedCity;
  public selectedRegion;
  public locationId;
  public locationName;
  public address;
  public addrList = [];
  public cities = [];
  public regions = [];


  constructor(public activeModal: NgbActiveModal,
              private accountService: AccountService,
              private addressService: AdressService) { }

  ngOnInit() {
    this.getAddress();
  }

  getAddress() {
    this.addressService.getAddress()
      .subscribe(data => {
        this.addrList = data;
      });
  }

  provinceChange(value): void {
    console.log(value);
    this.locationId = value.LocationId;
    this.locationName = value.LocationName;
    this.cities = value.cities;
    this.selectedCity = '';
    this.selectedRegion = '';
  }
  cityChange(value) {
    this.selectedRegion = '';
    this.locationId = value.LocationId;
    this.locationName = value.LocationName;
    this.regions = value.regions;
  }
  regionChange(value) {
    this.locationId = value.LocationId;
    this.locationName = value.LocationName;
  }


  save() {
    let that = this;
    console.log(this.locationId, this.selectedCity, this.selectedRegion);
    let post = {
      uid: this.uid
    };
    /*this.accountService.updateConfig(post)
      .subscribe(val => {
        Swal(
          '操作成功！',
          '',
          'success'
        );
        that.activeModal.close('ok');
      }, err => {
        Swal(
          err.message,
          '',
          'error'
        );
      });*/
  }

}
