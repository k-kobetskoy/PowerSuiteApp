import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UserEnvironmentModel } from 'src/app/models/user-environment.model';
import { UserDataService } from 'src/app/services/data/user-data.service';
import { ConnectionsDialogComponent } from '../connections-dialog/connections-dialog.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit {

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
      this.authService.userAdded$.subscribe(result=>{
        if(result){
          this.dialog.open(ConnectionsDialogComponent)
        }
      })      
    } else {
      this.dialog.open(ConnectionsDialogComponent)
    }
  }
}