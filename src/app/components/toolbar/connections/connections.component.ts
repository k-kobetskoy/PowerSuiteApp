import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription, filter } from 'rxjs';
import { UserEnvironmentModel } from 'src/app/models/user-environment.model';
import { UserDataService } from 'src/app/services/data/user-data.service';
import { ConnectionsDialogComponent } from '../connections-dialog/connections-dialog.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit, OnDestroy {

  subs: Subscription[] = []

  @Output() onEnvironmentConnection = new EventEmitter<UserEnvironmentModel>()
  selectedEnvironment$: Observable<UserEnvironmentModel>

  rippleColor: string = '#4b4b4b';

  constructor(private dialog: MatDialog,
    private userDataService: UserDataService,
    private authService: AuthService) { }

  ngOnInit() {
    this.selectedEnvironment$ = this.userDataService.activeEnvironment$
  }

  openDialog() {
    if (!this.authService.userIsLoggedIn) {
      this.authService.loginPopup()
      this.subs.push(this.authService.userAdded$.pipe(filter(result => result === true))
        .subscribe(_ => { this.createDialog() }))
    } else {
      this.createDialog()
    }
  }

  private createDialog() {
    this.dialog.open(ConnectionsDialogComponent, {
      height: '600px',
      width: '420px',
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(subscription => {
      subscription.unsubscribe
    })
  }
}