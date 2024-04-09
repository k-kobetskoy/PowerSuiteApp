import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConnectionsDialogComponent } from '../connections-dialog/connections-dialog.component';
import { GlolobalDiscoDataService } from 'src/app/services/data/global-disco-data.serivce';
import { Observable, Subscription } from 'rxjs';
import { UserEnvironmentModel } from 'src/app/models/user-environment.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/data/user-data.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit {

  @Output() onEnvironmentConnection = new EventEmitter<UserEnvironmentModel>()

  selectedEnvironment$: Observable<UserEnvironmentModel>
  environmentsList$: Observable<UserEnvironmentModel[]>

  rippleColor: string = '#4b4b4b';
  private _subs: Subscription[] = []

  constructor(private dialog: MatDialog,
    private globalDiscoDataService: GlolobalDiscoDataService,
    private authService: AuthService,
    private router: Router,
    private userDataService: UserDataService) { }

  ngOnInit() {
    this.selectedEnvironment$ = this.userDataService.activeEnvironment$   
  }

  getListOfEnvironments() {
    this.environmentsList$ = this.globalDiscoDataService.environmentsList$
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConnectionsDialogComponent, { data: { selectedEnv: {}, envList: this.environmentsList$ } })

    this._subs.push(dialogRef.afterClosed().subscribe(result => {
      if (result) this.connectToEnvironment(result)
    },
      (err) => console.error(err)
    ))
  }

  private connectToEnvironment(selectedEnv: UserEnvironmentModel) {
    this.authService.addProtectedResourceToInterceptorConfig(`${selectedEnv.apiUrl}/api/data/v9.2/`, [`${selectedEnv.apiUrl}/user_impersonation`])

    this.userDataService.connectToEnvironment(selectedEnv)

    this.navigateToCurrentEnvUrl()
  }

  navigateToCurrentEnvUrl() {
    this.selectedEnvironment$.subscribe(val =>
      this.router.navigateByUrl(`${this.router.url}/${val.apiUrl.slice(8)}`)
    )
  }

  ngOnDestroy() {
    this._subs.forEach(sub => {
      sub.unsubscribe()
    });
  }
}