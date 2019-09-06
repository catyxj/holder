import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../shared/user.service";
import {HttpClient} from "@angular/common/http";
import {RegisterService} from "../../shared/register.service";

@Component({
  selector: 'app-qiantian',
  templateUrl: './qiantian.component.html',
  styleUrls: ['./qiantian.component.css']
})
export class QiantianComponent implements OnInit {
  public imgArr = [];
  public user = { username: '', password: '' , ip: ''};
  public errMes: string ;
  public checkRemember = false;
  public hideLogin = true;


  constructor(public router: Router,
              private registerService: RegisterService,
              private http: HttpClient) { }

  ngOnInit() {
    this.imgArr = [
      {
        id: 1,
        img: 'assets/images/qiantian/banner0.jpg'
      },
      {
        id: 2,
        img: 'assets/images/qiantian/banner1.jpg'
      },
      {
        id: 3,
        img: 'assets/images/qiantian/banner2.jpg'
      }
    ];

    this.getConfig()
      .subscribe(ipInfo => {this.user.ip = ipInfo.ip; });

    let getLocal = localStorage.getItem('holderUser');
    if (getLocal) {
      this.user.username = getLocal;
      this.checkRemember = true;
    } else {

    }


  }


  loginBtn() {
    this.hideLogin = false;
  }



  getConfig(): any {
    const IP_JSON_URL = 'https://ipv4.myexternalip.com/json';
    return this.http.get(IP_JSON_URL);
  }

  login(): void {
    // console.log(this.user);
    if (this.checkRemember === true) {
      localStorage.setItem('holderUser', this.user.username);
    } else {
      localStorage.removeItem('holderUser');
    }

    this.registerService.login(this.user)
      .subscribe(
        user => {
          this.user = user;
          sessionStorage.user = true;
          this.router.navigate(['/admin']);
        }, // success path
        error => this.errMes = error // error path
      );
  }


}
