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


  constructor(public router: Router,
              private userService: UserService,
              private vCodeService: VerifyCodeService,
              private http: HttpClient) { }

  ngOnInit() {
    // let token = localStorage.getItem('authToken');
    // let status = sessionStorage.getItem('user');
    // if (status === 'true' && token) {
    //   this.goAdmin();
    // }

  }

  goAdmin() {
    let roleId = localStorage.getItem('roleId');
    console.log(roleId);
    switch (roleId) {
      case '1':
        this.router.navigate(['/admin/ad']);
        break;
      case '10':
        this.router.navigate(['/admin/formal']);
        break;
      case '15':
        this.router.navigate(['/admin/service']);
        break;
      default:
        this.router.navigate(['/admin']);
    }



  }


}
