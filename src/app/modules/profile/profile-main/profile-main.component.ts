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

  public profile: User ;

  constructor(private userService: UserService, private profileService: ProfileService) { }

  ngOnInit() {
    this.getUser();
  }


  getUser(): void {
    this.userService.getUser()
      .subscribe(user => { this.profile = user; });
  }

}


