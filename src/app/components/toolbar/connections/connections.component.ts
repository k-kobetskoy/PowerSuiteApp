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
  envFriendlyName: string = "Kostiantyn Kobetskyi's"
  envName: string = 'org2d6763a7'

  environmentsList: IUserEnvironmentModel[] = []
  private sub: Subscription = new Subscription

  constructor(private dialog: MatDialog,  private dataService: GlolobalDiscoDataService) { }

  ngOnInit() {
  }

  // connect() {
  //   this.connectionEstablished = !this.connectionEstablished
  // }

  connect() {
    let response$ = this.dataService.getAll()
    this.mapResponse(response$)       
  }


  openDialog(){
    const dialogRef = this.dialog.open(ConnectionsDialogComponent, { data: { selectedEnv: 'haha', envList: this.environmentsList } })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
      console.log(result)
    })
  }

  private mapResponse(response$: Observable<IGlobalDiscoInstancesResponseModel>) {
    this.sub = response$.subscribe(
      
      resp => {
      for (let environment of resp.value) {
        this.environmentsList.push({
          apiUrl: environment.ApiUrl,
          friendlyName: environment.FriendlyName,
          url: environment.Url,
          urlName: environment.UrlName
        })
      }
    }, 
    
    (err)=>console.error(err),

    ()=>this.openDialog()    
    )    
  }

  ngOnDestroy() {
    this.sub.unsubscribe
  }

}
