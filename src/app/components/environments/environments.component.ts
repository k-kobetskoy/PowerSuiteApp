import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUserEnvironmentModel } from '../../models/user-environment.model';
import { GlolobalDiscoDataService } from 'src/app/services/repositories/global-disco-data.serivce';
import { IGlobalDiscoInstancesResponseModel } from 'src/app/models/incoming/global-disco/global-disco-instances-response.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-environments',
  templateUrl: './environments.component.html',
  styleUrls: ['./environments.component.css']
})

export class EnvironmentsComponent implements OnInit, OnDestroy {

  environmentsList: IUserEnvironmentModel[] = []
  private sub: Subscription = new Subscription

  constructor(private dataService: GlolobalDiscoDataService) { }

  ngOnInit() {
    let response$ = this.dataService.getAll()
    this.mapResponse(response$)
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe
  }

  private mapResponse(response$: Observable<IGlobalDiscoInstancesResponseModel>) {
    this.sub = response$.subscribe(resp => {
      for (let environment of resp.value) {
        this.environmentsList.push({
          apiUrl: environment.ApiUrl,
          friendlyName: environment.FriendlyName,
          url: environment.Url,
          urlName: environment.UrlName
        })
      }
    })
  }
}