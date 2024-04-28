import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable} from 'rxjs';
import { UserEnvironmentModel } from 'src/app/models/user-environment-model';
import { UserDataService } from 'src/app/services/request/user-data.service';
import { NavigationService } from 'src/app/services/navigation.service';

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
    private navigationService: NavigationService,
    private userDataService: UserDataService) { }

  ngOnInit() {
    this.environmentsList$ = this.userDataService.availableUserEnvironments$
  }

  connectToEnvironment(selectedEnv: UserEnvironmentModel) {
    this.navigationService.navigateToEnv(selectedEnv)
    this.closeDialog()
  }

  closeDialog(): void {
    this.dialogRef.close()
  }
}
