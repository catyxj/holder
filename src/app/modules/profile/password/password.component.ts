import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../../shared/profile.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  public profile = {
    password: '' ,
    password_new: '',
    password_new_confirm: ''
  };

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
  }

  updateUserPassword(): void {
    this.profileService.changePassword({password: this.profile.password, password_new: this.profile.password_new})
      .subscribe(password => {console.log('success'); });
  }

}
