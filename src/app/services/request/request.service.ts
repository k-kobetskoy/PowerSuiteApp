import { Injectable } from '@angular/core';
import { GlobalDiscoveryRequestService } from './global-discovery-request.service';
import { EnvironmentModel } from 'src/app/models/environment-model';
import { EnvironmentRequestService } from './environment-request.service';
import { EventBusService } from '../event-bus/event-bus.service';
import { Observable, of } from 'rxjs';
import { EntityModel } from 'src/app/models/incoming/environment/entity-model';
import { AppEvents } from '../event-bus/app-events';
import { AttributeModel } from 'src/app/models/incoming/attrubute/attribute-model';


@Injectable({ providedIn: 'root' })
export class RequestService {

  activeEnvironment: EnvironmentModel = null

  constructor(
    private eventBus: EventBusService,
    private globalDiscoService: GlobalDiscoveryRequestService, 
    private environmentService: EnvironmentRequestService) {
    this._getActiveEnvironment()
    this.eventBus.on(AppEvents.ENVIRONMENT_CHANGED, () => this._getActiveEnvironment())
  }

  @CheckActiveEnvironment
  getEntities(): Observable<EntityModel[]> {
    return this.environmentService.getEntities(this.activeEnvironment.apiUrl)
  }

  @CheckActiveEnvironment
  getAttributes(entityName: string): Observable<AttributeModel[]> {
    return this.environmentService.getAttributes(this.activeEnvironment.apiUrl, entityName)
  }

  getEnvironments(): Observable<EnvironmentModel[]> {
    return this.globalDiscoService.getAvailableUserEnvironments()
  }

  setActiveEnvironment(environment: EnvironmentModel): void {
    this.globalDiscoService.setActiveEnvironment(environment)
  }

  getActiveEnvironment(): Observable<EnvironmentModel> {
    return this.globalDiscoService.getActiveEnvironment()
  }

  removeActiveEnvironment(): void {
    this.globalDiscoService.removeActiveEnvironment()
  }


  private _getActiveEnvironment(): void {
    this.globalDiscoService.getActiveEnvironment().subscribe(env => {
      if (env) {
        this.activeEnvironment = env
      }
    })
  }
}

function CheckActiveEnvironment(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function () {
    if (!this.activeEnvironment) {
      return of(null)
    }
    return originalMethod.apply(this, arguments);
  };

  return descriptor;
}
