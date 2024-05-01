import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { EnvironmentModel } from 'src/app/models/environment-model';
import { ConnectionsDialogComponent } from './connections-dialog/connections-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { EnvironmentsRequestService } from 'src/app/services/request/environments-request.service';
import { EventBusService } from 'src/app/services/event-bus/event-bus.service';
import { AppEvents } from 'src/app/services/event-bus/app-events';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit, OnDestroy {

  subs: Subscription[] = []

  @Output() onEnvironmentConnection = new EventEmitter<EnvironmentModel>()
  activeEnvironment$: Observable<EnvironmentModel>

  rippleColor: string = '#4b4b4b';

  constructor(private dialog: MatDialog,
    private authService: AuthService,
    private environmentsService: EnvironmentsRequestService,
    private eventBus: EventBusService) { }

  ngOnInit() {
    this.activeEnvironment$ = this.environmentsService.getActiveEnvironment()
    this.eventBus.onLast(AppEvents.USER_REMOVED, () => this.environmentsService.removeActiveEnvironment())
  }

  openDialog() {
    if (!this.authService.userIsLoggedIn) {
      this.authService.loginPopup()
      this.eventBus.on(AppEvents.LOGIN_SUCCESS, () => {
        console.warn('eventBus : on AppEvents.USER_ADDED')
        this.createDialog()
      })
    } else {
      this.createDialog()
    }
  }

  private createDialog() {
    this.dialog.open(ConnectionsDialogComponent, {
      height: '600px',
      width: '420px',
    })
  }

  ngOnDestroy(): void {
    this.subs.forEach(subscription => {
      subscription.unsubscribe
    })
  }
}