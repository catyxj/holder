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
    this.getUser();
  }

  getUser(): void {
    this.userService.getUser()
      .subscribe(user => { this.profile = user;  });
  }

  updateUser() {

  }

}
