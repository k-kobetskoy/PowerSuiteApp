import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';
import { UrlRouteParams } from 'src/app/config/url-route-params';
import { UserEnvironmentModel } from 'src/app/models/user-environment.model';
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
    private userDataService: UserDataService,
    private router: Router) { }

  ngOnInit() {
    this.environmentsList$ = this.userDataService.availableUserEnvironments$
  }

  connectToEnvironment(selectedEnv: UserEnvironmentModel) {

    this.userDataService.connectToEnvironment(selectedEnv)

    this.navigateToEnvUrl(selectedEnv)

    this.closeDialog()
  }

  navigateToEnvUrl(selectedEnv: UserEnvironmentModel) {
    let envParam = selectedEnv.url.slice(8)

    let urlTree = this.router.parseUrl(this.router.url);
    urlTree.queryParams[UrlRouteParams.environment] = envParam;
  
    this.router.navigateByUrl(urlTree);
  }

  closeDialog(): void {
    this.dialogRef.close()
  }
}
