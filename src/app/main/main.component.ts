import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../shared/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/index";
import {MediaMatcher} from "@angular/cdk/layout";
import {NzModalService} from "ng-zorro-antd/modal";



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})



export class MainComponent implements OnInit, OnDestroy {

  public user;
  public subscription: Subscription;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NzModalService,
              changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.subscription = this.userService.changeUserStatus$
      .subscribe( data => {
        this.getUser();
      });


    this.mobileQuery = media.matchMedia('(max-width: 800px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    /*setTimeout(() => {

    }, 500);*/
    this.getUser();
  }

  getUser(): void {

    this.userService.getUser()
      .subscribe(user => {
        this.user = user;
        sessionStorage.setItem('currentUser', JSON.stringify(this.user));
        this.userService.StatusMission(this.user);
        if (!this.user) {
          sessionStorage.user = false;
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/login']);
        }
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
