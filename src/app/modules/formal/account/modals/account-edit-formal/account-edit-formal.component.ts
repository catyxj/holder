import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AccountService} from "../../../../../shared/account.service";
import {AdressService} from "../../../../../shared/adress.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-edit-formal',
  templateUrl: './account-edit-formal.component.html',
  styleUrls: ['./account-edit-formal.component.css']
})
export class AccountEditFormalComponent implements OnInit {
  @Input()
  currentData;

  public name;
  public orgName;
  public orgType;
  public email;
  public selectedProvince;
  public selectedCity;
  public selectedRegion;
  public locationId;
  public locationName = '';
  public address;
  public addrList;
  public cities = [];
  public regions = [];


  constructor(public activeModal: NgbActiveModal,
              private accountService: AccountService,
              private addressService: AdressService) { }

  ngOnInit() {
    this.name = this.currentData.name;
    this.orgName = this.currentData.org_name;
    this.orgType = this.currentData.org_tag.toString();
    this.address = this.currentData.address;
    this.email = this.currentData.email;
    this.getAddress();
  }

  getAddress() {
    this.addressService.getAddress()
      .subscribe(data => {
        this.addrList = data;
        this.initLocation();
      });
  }

  initLocation() {
    let location = this.currentData.location_id;
    console.log(location);
    if (location && location !== 0) {
      if (location < 100) {
        location = location * 10000;
      } else if ( location < 10000) {
        location = location * 100;
      }
    }
    let aProvince = location ? Math.floor(location / 10000) : 0;
    let aCity = location ? Math.floor(location / 100) : 0;
    let aRegion = location ? location : 0;

    if (aProvince === 0) {
      this.selectedProvince = this.addrList[0];
      this.locationId = this.addrList[0].LocationId;
      this.locationName = this.addrList[0].LocationName;
      return;
    }
    for (let i = 0; i < this.addrList.length; i++) {
      if ( aProvince === this.addrList[i].LocationId ) {
        this.cities = this.addrList[i].cities;
        this.selectedProvince = this.addrList[i];
        this.locationId = this.addrList[i].LocationId;
        this.locationName = this.addrList[i].LocationName;
        if (aCity) {
          for (let j = 0; j < this.cities.length; j++) {
            if (aCity === this.cities[j].LocationId) {
              this.regions = this.cities[j].regions;
              this.selectedCity = this.cities[j];
              this.locationId = this.cities[j].LocationId;
              this.locationName = this.cities[j].LocationName;
              if (aRegion) {
                for ( let n = 0; n < this.regions.length; n++) {
                  if (aRegion === this.regions[n].LocationId) {
                    this.selectedRegion = this.regions[n];
                    this.locationId = this.regions[n].LocationId;
                    this.locationName = this.regions[n].LocationName;
                    break;
                  }
                }
              }
              break;
            }
          }
        }
        break;
      }
    }

  }

  provinceChange(value): void {
    console.log(value);
    this.locationId = value.LocationId;
    this.locationName = value.LocationName;
    this.cities = value.cities;
    this.selectedCity = null;
    this.selectedRegion = null;
  }
  cityChange(value) {
    this.locationId = value.LocationId;
    this.locationName = value.LocationName;
    this.regions = value.regions;
    this.selectedRegion = null;
  }
  regionChange(value) {
    this.locationId = value.LocationId;
    this.locationName = value.LocationName;
  }


  save() {
    let that = this;
    // console.log(this.locationId, this.selectedCity, this.selectedRegion);
    let post = {
      name: this.name,
      org_name: this.orgName,
      org_tag: parseInt(this.orgType),
      location_id: this.locationId,
      location_name: this.locationName + this.address,
      address: this.address,
      email: this.email
    };
    // console.log(post);
    this.accountService.updateConfigF(post)
      .subscribe(val => {
        Swal(
          '操作成功！',
          '',
          'success'
        );
        that.activeModal.close('ok');
      }, err => {
        Swal(
          err.message || err,
          '',
          'error'
        );
      });
  }

}
