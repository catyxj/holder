import { Component, OnInit } from '@angular/core';
import {UserAccountService} from '../../../shared/user-account.service';
import {UserService} from '../../../shared/user.service';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent implements OnInit {

  roles: any[];
  user: any;
  aroles: any[] = [];
  accounts: any[];
  page = 1;
  totalItems = 0;


  constructor(private userAccountService: UserAccountService, private userService: UserService) { }

  ngOnInit() {
    this.getUserAccount();
    this.getUser();
  }


  getUser(): void {
    this.userService.getUser()
      .subscribe(user => {
        this.user = user;
        this.getUserRoles();
      });
  }

  getUserRoles(): void {
    this.userAccountService.getUserRoles()
      .subscribe(roles => {
        this.roles = roles;
        // console.log(this.roles);
        for ( let i = 0; i < this.roles.length; i++) {
          let d = this.roles[i];
          if (d.RoleId > this.user.Role.RoleId) {
            this.aroles.push({ id: d.RoleId, name: d.Name });
          }
        }
        // console.log(this.aroles);
      });
  }

  getUserAccount(): void {
    this.userAccountService.getAccounts(1)
      .subscribe(account => {
        this.accounts = account;
        console.log(this.accounts);
      })
  }


}
