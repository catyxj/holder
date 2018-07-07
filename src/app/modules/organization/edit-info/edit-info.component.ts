import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {OrganizationService} from '../../../shared/organization.service';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.css']
})
export class EditInfoComponent implements OnInit {

  @Input()
  currentData: any;
  currentUser: any;
  editing: boolean;
  locations: any;

  public orgTypes: any[];
  public data: any ;
  public cities: any;
  public regions: any;



  constructor(public activeModal: NgbActiveModal, private orgService: OrganizationService) { }

  ngOnInit() {

    this.getOrgType();

    if (this.currentData.Address) {
      let locationId = this.currentData.Address.Location.LocationId;
      if (locationId < 100) {
        this.currentData.Address.Location.LocationId = locationId * 10000;
      } else if (locationId < 10000) {
        this.currentData.Address.Location.LocationId = locationId * 100;
      }
    }
    this.data = {
      name: this.currentData.Name,
      typeId: this.currentData.Type.TypeId,
      aProvince: this.currentData.Address ? Math.floor(this.currentData.Address.Location.LocationId / 10000) : 0,
      aCity: this.currentData.Address ? Math.floor(this.currentData.Address.Location.LocationId / 100) : 0,
      aRegion: this.currentData.Address ? this.currentData.Address.Location.LocationId  : 0,
      address: this.currentData.Address ? this.currentData.Address.Address : '',
      isSuper: this.currentData.IsSupervisor,
      showBrand: this.currentData.ShowBrand,
      brandName: this.currentData.BrandName
    };

    if (this.data.aProvince) {
      this.initProvince();
    }
    if (this.data.aCity) {
      this.changeCities();
    }
    if (this.data.aRegion) {
      this.changeRegion();
    }

    console.log(this.currentData, this.data);

  }


  // 地址
  initProvince() {
    for (let i = 0; i < this.locations.length; i++) {
      if ( parseInt(this.data.aProvince) === 0) {
        this.cities = [];
        this.regions = [];
        return;
      }
      if ( parseInt(this.data.aProvince) === this.locations[i].LocationId ) {
        this.cities = this.locations[i].cities;
      }
    }
    this.data.location = parseInt(this.data.aProvince);
  }

  changeProvince() {
    for (let i = 0; i < this.locations.length; i++) {
      if ( parseInt(this.data.aProvince) === 0) {
        this.cities = [];
        this.regions = [];
        return;
      }
      if ( parseInt(this.data.aProvince) === this.locations[i].LocationId ) {
        this.cities = this.locations[i].cities;
      }
    }
    this.data.aCity = 0;
    this.data.aRegion = 0;
    this.data.location = parseInt(this.data.aProvince);
  }
  changeCities() {
    for (let i = 0; i < this.cities.length; i++) {
      if ( parseInt(this.data.aCity) === this.cities[i].LocationId ) {
        this.regions = this.cities[i].regions;
      }
    }
    this.data.location = parseInt(this.data.aCity);
  }

  changeRegion() {
    this.data.location = parseInt(this.data.aRegion);
  }

  // 获取企业类型
  getOrgType() {
    this.orgService.getOrgType()
      .subscribe(types => {this.orgTypes = types; });
  }


  // 保存
  save() {
    let postData = {
      uid: this.currentData.Uid,
      name: this.data.name,
      type_id: parseInt(this.data.typeId),
      address: this.data.address,
      location_id: this.data.location,
      show_brand: null,
      brand_name: null,
      is_super: null
    };
    if (this.currentUser.Role.RoleId <= 2) {
      postData.show_brand = this.data.showBrand;
      postData.brand_name = this.data.brandName;

      postData.is_super = this.data.isSuper;
      // postData.supervisor = $modal.supervisor;
    }

    this.orgService.save(postData)
      .subscribe(val => {
        alert('保存成功');
        this.activeModal.close('ok');
      });


  }

  cancel() {
    this.activeModal.dismiss('close');
  }

}
