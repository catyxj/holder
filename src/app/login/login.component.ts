import { Component, OnInit } from '@angular/core';
import {
  Router,
} from '@angular/router';
import {UserService} from '../shared/user.service';
import { HttpClient } from '@angular/common/http';
import {VerifyCodeService} from "../shared/verify-code.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public currentType = 1;

  public islogged = false;
  public user;
  public roleId;
  public token;
  public picture;


  constructor(public router: Router,
              private userService: UserService,
              private vCodeService: VerifyCodeService,
              private http: HttpClient) { }

  ngOnInit() {

    this.token = localStorage.getItem('authToken');
    this.roleId = localStorage.getItem('roleId');
    // let status = sessionStorage.getItem('user');
    // if (status === 'true' && token) {
    //   this.goAdmin();
    // }
    localStorage.clear();

    this.picture = 'assets/images/login/anticon_user2.png';
    if (this.token) {
      this.getUser(this.token);
    }


  }

  getUser(token): void {

    this.userService.getUser(token)
      .subscribe(user => {
        this.islogged = true;
        this.user = user;
        // sessionStorage.setItem('currentUser', JSON.stringify(this.user));
        localStorage.setItem('authToken', this.token);
        localStorage.setItem('roleId', this.user.role_id);
        if (!this.user || !this.user.picture) {
          this.picture = 'assets/images/login/anticon_user2.png';
        } else {
          this.picture = this.user.picture;
        }
      }, err => {
        this.islogged = false;

      });
  }

  goAdmin() {
    let roleId = localStorage.getItem('roleId');
    console.log(this.roleId);
    switch (this.roleId) {
      case '1':
        this.router.navigate(['/admin/ad']);
        break;
      case '5':
        this.router.navigate(['/admin/operator/delivery']);
        break;
      case '6':
        this.router.navigate(['/admin/finance']);
        break;
      case '10':
      case '11':
        this.router.navigate(['/admin/ordinary']);
        break;
      case '15':
        this.router.navigate(['/admin/service']);
        break;
      default:
        this.router.navigate(['/admin']);
    }



  }


}
