import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { EnvironmentModel } from 'src/app/models/environment-model';
import { ConnectionsDialogComponent } from './connections-dialog/connections-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { EventBusService } from 'src/app/services/event-bus/event-bus.service';
import { AppEvents } from 'src/app/services/event-bus/app-events';
import { EnvironmentEntityService } from 'src/app/components/query-builder/services/entity-services/environment-entity.service';

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
    private _authService: AuthService,
    private _environmentEntityService: EnvironmentEntityService,
    private _eventBus: EventBusService) { }

  ngOnInit() {
    this.activeEnvironment$ = this._environmentEntityService.getActiveEnvironment();
  }

  openDialog() {
    if (!this._authService.userIsLoggedIn) {
      this._authService.loginPopup()
      this._eventBus.on(AppEvents.LOGIN_SUCCESS, () => {
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