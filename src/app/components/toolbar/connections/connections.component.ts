import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { EnvironmentModel } from 'src/app/models/environment-model';
import { ConnectionsDialogComponent } from './connections-dialog/connections-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { EventBusService } from 'src/app/services/event-bus/event-bus.service';
import { AppEvents } from 'src/app/services/event-bus/app-events';
import { RequestService } from 'src/app/services/request/request.service';

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
    private requestService: RequestService,
    private eventBus: EventBusService) { }

  ngOnInit() {
    this.activeEnvironment$ = this.requestService.getActiveEnvironment()
    if(this.activeEnvironment$){
      this.subs.push(this.activeEnvironment$.subscribe(env => {
        if(env){
          this.authService.addProtectedResourceToInterceptorConfig(env.apiUrl)
        }        
      }));
    }
    
    this.eventBus.onLast(AppEvents.USER_REMOVED, () => this.requestService.removeActiveEnvironment())

    this.authService.checkProtectedResource();
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