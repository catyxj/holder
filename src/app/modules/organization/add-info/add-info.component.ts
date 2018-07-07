import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {OrganizationService} from '../../../shared/organization.service';

@Component({
  selector: 'app-add-info',
  templateUrl: './add-info.component.html',
  styleUrls: ['./add-info.component.css']
})
export class AddInfoComponent implements OnInit {

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
    this.data = {
      name: '',
      typeId: null,
      aProvince: 0,
      aCity: 0,
      aRegion: 0,
      address: '',
      isSuper: false,
      showBrand: false,
      brandName: ''
    };

  }


  // 地址
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

    }

    // console.log(postData);
    this.orgService.add(postData)
      .subscribe(val => {
        alert('保存成功');
        this.activeModal.close('ok');
      });


  }

  cancel() {
    this.activeModal.dismiss('close');
  }

}
