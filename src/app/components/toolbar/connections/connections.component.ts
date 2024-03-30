import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConnectionsDialogComponent } from '../connections-dialog/connections-dialog.component';
import { GlolobalDiscoDataService } from 'src/app/services/repositories/global-disco-data.serivce';
import { Observable, Subscription } from 'rxjs';
import { IGlobalDiscoInstancesResponseModel } from 'src/app/models/incoming/global-disco/global-disco-instances-response.model';
import { IUserEnvironmentModel } from 'src/app/models/user-environment.model';


@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit {

  connectionEstablished: boolean = false;
  selectedEnvironment!: IUserEnvironmentModel

  environmentsList: IUserEnvironmentModel[] = []
  private subs: Subscription[] = []

  constructor(private dialog: MatDialog, private dataService: GlolobalDiscoDataService) { }

  ngOnInit() {
  }

  connect() {
    let response$ = this.dataService.getAll()
    this.mapResponse(response$)
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConnectionsDialogComponent, { data: { selectedEnv: {}, envList: this.environmentsList } })

    this.subs.push(dialogRef.afterClosed().subscribe(result => {
      this.selectedEnvironment = result
    },

    (err)=>console.error(err),
    () => this.establishConnection()
    ))    
  }
  private establishConnection() {
    this.connectionEstablished = true
  }

  private mapResponse(response$: Observable<IGlobalDiscoInstancesResponseModel>) {
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

      (err) => console.error(err),

      () => this.openDialog()
    ))
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      sub.unsubscribe()
    });
  }
}
