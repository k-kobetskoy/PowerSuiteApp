import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserEnvironmentModel } from 'src/app/models/user-environment.model';
import { AuthService } from 'src/app/services/auth.service';
import { GlolobalDiscoDataService } from 'src/app/services/data/global-disco-data.serivce';
import { UserDataService } from 'src/app/services/data/user-data.service';


@Component({
  selector: 'app-connections-dialog',
  templateUrl: './connections-dialog.component.html',
  styleUrls: ['./connections-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConnectionsDialogComponent implements OnInit {

  environmentsList$: Observable<UserEnvironmentModel[]>

  constructor(
    private dialogRef: MatDialogRef<ConnectionsDialogComponent>,
    private globalDiscoDataService: GlolobalDiscoDataService,
    private authService: AuthService,
    private userDataService: UserDataService,
    private router: Router) { }

  ngOnInit() {
    this.environmentsList$ = this.globalDiscoDataService.environmentsList$   
  }

  connectToEnvironment(selectedEnv: UserEnvironmentModel) {
    this.authService.addProtectedResourceToInterceptorConfig(`${selectedEnv.apiUrl}/api/data/v9.2/`, [`${selectedEnv.apiUrl}/user_impersonation`])

    this.userDataService.connectToEnvironment(selectedEnv)

    this.navigateToEnvUrl(selectedEnv)

    this.closeDialog()
  }

  navigateToEnvUrl(selectedEnv: UserEnvironmentModel) {
    this.router.navigateByUrl(`${this.router.url}/${selectedEnv.apiUrl.slice(8)}`)
  }

  closeDialog(): void {
    this.dialogRef.close()
  }
}
