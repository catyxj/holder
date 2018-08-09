import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../shared/user.service';
import {ProfileService} from '../../../shared/profile.service';
import {User} from '../../../user';

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.css']
})
export class ProfileMainComponent implements OnInit {

  public profile: any;

  constructor(private userService: UserService, private profileService: ProfileService) {
    this.userService.userStatus$ // 监测父组件user
      .subscribe( data => {
        this.profile = data;
      }
    );
  }

  ngOnInit() {
    let user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.profile = user;
    // this.getUser();
  }


  getUser(): void {
    this.userService.getUser()
      .subscribe(user => { this.profile = user; });
  }

}


