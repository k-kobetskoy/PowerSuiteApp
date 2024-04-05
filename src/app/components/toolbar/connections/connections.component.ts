import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConnectionsDialogComponent } from '../connections-dialog/connections-dialog.component';
import { GlolobalDiscoDataService } from 'src/app/services/data/global-disco-data.serivce';
import { Observable, Subscription } from 'rxjs';
import { GlobalDiscoInstancesResponseModel } from 'src/app/models/incoming/global-disco/global-disco-instances-response.model';
import { UserEnvironmentModel } from 'src/app/models/user-environment.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit {

  selectedEnvironment: UserEnvironmentModel | undefined

  environmentsList: UserEnvironmentModel[] = []
  private subs: Subscription[] = []
  myColor: string = '#4b4b4b';

  constructor(private dialog: MatDialog, private dataService: GlolobalDiscoDataService, private authService: AuthService,private cd: ChangeDetectorRef) { }

  ngOnInit() {
    let selectedEnv = localStorage.getItem('selectedEnvironment')
    if (selectedEnv) { this.selectedEnvironment = JSON.parse(selectedEnv) }
    this.subs.push(this.authService.userIsLoggedIn$.subscribe((x) => {
      if(!x){
        selectedEnv = undefined
        localStorage.removeItem('selectedEnvironment')
        sessionStorage.clear()
        console.log('selected env '+ selectedEnv)
        this.cd.detectChanges()
      }
    }))
  }

  connect() {
    let response$ = this.dataService.getAll()
    this.mapResponse(response$)
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConnectionsDialogComponent, { data: { selectedEnv: {}, envList: this.environmentsList } })

    this.subs.push(dialogRef.afterClosed().subscribe(result => {
      if (result) this.establishConnection(result)
    },

      (err) => console.error(err)
    ))
  }
  private establishConnection(selectedEnv: UserEnvironmentModel) {
    //connect to env (msal)
    localStorage.setItem('selectedEnvironment', JSON.stringify(selectedEnv))

    console.log(selectedEnv)

    this.selectedEnvironment = selectedEnv
    //redirect
  }

  private mapResponse(response$: Observable<GlobalDiscoInstancesResponseModel>) {
    this.subs.push(response$.subscribe(
      resp => {
        this.environmentsList = []
        for (let environment of resp.value) {
          this.environmentsList.push({
            apiUrl: environment.ApiUrl,
            friendlyName: environment.FriendlyName,
            url: environment.Url,
            urlName: environment.UrlName
          })
        }
      },

      err => console.error(err),

      () => this.openDialog()
    ))
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      sub.unsubscribe()
    });
  }
}
