import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs/index";
import {UserService} from "../../../../shared/user.service";
import {Router} from "@angular/router";
import {MediaMatcher} from "@angular/cdk/layout";

@Component({
  selector: 'app-charge-main-dir',
  templateUrl: './charge-main-dir.component.html',
  styleUrls: ['./charge-main-dir.component.css']
})
export class ChargeMainDirComponent implements OnInit {
  public user;
  public roleId;
  public subscription: Subscription;

  public sideList;
  public authority;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private userService: UserService,
              private router: Router,
              private changeDetectorRef: ChangeDetectorRef,
              private media: MediaMatcher) {
    this.subscription = this.userService.changeUserStatus$
      .subscribe( data => {
        this.getUser();
      });
    this.mobileQuery = media.matchMedia('(max-width: 800px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.roleId = localStorage.getItem('roleId');
    this.authority = localStorage.getItem('authorities');
    this.getSide();
    this.getUser();
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
      }, err => {
        this.router.navigate(['/login']);
      });
  }

  getSide() {
    this.userService.getSideC()
      .subscribe(data => {
        this.sideList = data.sidenav;
      });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


}
