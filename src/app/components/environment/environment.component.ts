import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MSAL_INTERCEPTOR_CONFIG, MsalService } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { Observable, Subscription } from 'rxjs';
import { IEntityDefinitionModel } from 'src/app/models/incoming/environment/entity-definition.model';
import { IEntityDefinitionsResponseModel } from 'src/app/models/incoming/environment/entity-definitions-response.model';
import { EnvironmentDataService } from 'src/app/services/repositories/environment-data.service';

@Component({
  selector: 'app-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.css']
})
export class EnvironmentComponent implements OnInit {

  environmentUrl!: string | null
  sub: Subscription = new Subscription
  entities: IEntityDefinitionModel[] = []


  constructor(private route: ActivatedRoute, private dataService: EnvironmentDataService, private authService: MsalService) { }

  ngOnInit() {
    this.getRouteParam()
    this.addNewInstanceOfMsal()
    this.getEntityDefinitions()
  }

  addNewInstanceOfMsal() {
    this.authService.instance = new PublicClientApplication({
      auth: {
        clientId: '69111799-c2ca-490f-929f-4e5ee63b9792',
        authority: `https://login.microsoftonline.com/common/oauth2/authorize?resource=https://${this.environmentUrl}/`,
        redirectUri: 'http://localhost:4200',
        postLogoutRedirectUri: 'http://localhost:4200'
      },
      cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
      }
    }) 
    // , {
    //   interactionType: InteractionType.Popup,
    //   authRequest: {
    //     scopes: [`https://${this.environmentUrl}/user_impersonation`]
    //   },
    //   loginFailedRoute: "/login-failed"
    // }, {
    //   interactionType: "redirect",
    //   protectedResourceMap: [
    //     [`https://${this.environmentUrl}/api/data/v9.2`, [`https://${this.environmentUrl}/user_impersonation`]]
    //   ]
    // };
  }

  mapResponse(response$: Observable<IEntityDefinitionsResponseModel>) {
    this.sub = response$.subscribe(resp => {
      for (let entity of resp.value) {
        this.entities.push({
          LogicalName: entity.LogicalName,
          MetadataId: entity.MetadataId,
          DisplayName: entity.DisplayName,
        })
      }
    })
  }

  private getRouteParam() {
    this.environmentUrl = this.route.snapshot.paramMap.get('environment')
    console.log(this.environmentUrl)
  }

  getEntityDefinitions() {
    if (this.environmentUrl) {
      let response$ = this.dataService.getEntityDefinitions(this.environmentUrl);
      this.mapResponse(response$)
    }
  }
}
