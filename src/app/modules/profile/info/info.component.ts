import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../shared/user.service';
import {ProfileService} from '../../../shared/profile.service';
import {User} from '../../../user';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  public profile: any = {
    Name: '',
    MobileNumber: '',
    Email: '',
    Username: ''
  };
  constructor(private userService: UserService, private profileService: ProfileService) { }

  ngOnInit() {
    let user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.profile = user;
    // this.getUser();
  }

  /*getUser(): void {
    this.userService.getUser()
      .subscribe(user => { this.profile = user;  });
  }*/

  updateUser() {
    let postData = {
      fullname: this.profile.Name,
      mobile: this.profile.MobileNumber,
      email: this.profile.Email
    };
    this.profileService.updateProfile(postData)
      .subscribe(profile => {
        alert('更新成功');
        // this.profile = profile;
        this.userService.getUser()
          .subscribe( data => {
            this.profile = data;
            // sessionStorage.setItem('currentUser', JSON.stringify(this.profile));
            this.userService.ChangeMission('changed');
          });

      });
  }

}
