import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../shared/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/index";
import {MediaMatcher} from "@angular/cdk/layout";
import {NzModalService} from "ng-zorro-antd/modal";
import {PlatformLocation} from "@angular/common";



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})



export class MainComponent implements OnInit, OnDestroy {

  public user;
  public subscription: Subscription;

  public authority;
  public sideList;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private location: PlatformLocation,
              private modalService: NzModalService,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) {
    this.subscription = this.userService.changeUserStatus$
      .subscribe( data => {
        this.getUser();
      });


    this.mobileQuery = media.matchMedia('(max-width: 800px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    let token = localStorage.getItem('authToken');
    let roleId = localStorage.getItem('roleId');
    if (!token) {
      localStorage.user = 'false';
      sessionStorage.removeItem('currentUser');
      localStorage.removeItem('authToken');
      alert('token错误，请刷新页面重试');
      this.router.navigate(['/login']);
      // window.location.reload();
    }
    this.getSide();
    this.getUser();


    // console.log(this.location.hash);
    if (this.location.hash === '#/admin') {
      switch (roleId) {
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
          this.router.navigate(['/admin/ordinary']);
          break;
        case '11':
          this.router.navigate(['/admin/ordinary']);
          break;
        case '15':
          this.router.navigate(['/admin/service']);
          break;
      }
    }

  }

  getUser(): void {

    this.userService.getUser()
      .subscribe(user => {
        this.user = user;
        sessionStorage.setItem('currentUser', JSON.stringify(this.user));
        this.userService.StatusMission(this.user);
        if (!this.user) {
          localStorage.user = 'false';
          sessionStorage.removeItem('currentUser');
          localStorage.removeItem('authToken');
          this.router.navigate(['/login']);
        }
        console.log(this.user);
      }, err => {
        /*console.log(err);
        if (err.status === 550) {
          // alert(err.error);
          this.modalService.warning({
            nzTitle: err.error.message || err.error,
            nzContent: '',
            nzOnOk: () => {this.router.navigate(['/login']); }
          });
        }*/

        this.router.navigate(['/login']);

      });
  }


  getSide() {
    this.userService.getSide()
      .subscribe(data => {
        this.sideList = data.sidenav;
        this.authority = data.authority;
        let auth = {
          logo: this.checkAuth('1001'),
          eptCtrl: this.checkAuth('1006'),
          calculate: this.checkAuth('1007'),
          face: this.checkAuth('1008')
        };
        localStorage.setItem('authorities', this.authority);
        localStorage.setItem('auth', JSON.stringify(auth));
      });
  }


  checkAuth(data) {
    return this.authority.indexOf(data) !== -1;
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
