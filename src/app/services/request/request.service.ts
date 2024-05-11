import { Injectable } from '@angular/core';
import { EnvironmentsRequestService } from './environments-request.service';
import { EnvironmentModel } from 'src/app/models/environment-model';
import { EnvironmentRequestService } from './environment-request.service';
import { EventBusService } from '../event-bus/event-bus.service';
import { Observable, of } from 'rxjs';
import { EntityModel } from 'src/app/models/incoming/environment/entity-model';
import { AppEvents } from '../event-bus/app-events';


@Injectable({ providedIn: 'root' })
export class RequestService {

  activeEnvironment: EnvironmentModel = null

  constructor(
    private eventBus: EventBusService,
    private environmentsService: EnvironmentsRequestService, 
    private environmentService: EnvironmentRequestService) {
    this._getActiveEnvironment()
    this.eventBus.on(AppEvents.ENVIRONMENT_CHANGED, () => this._getActiveEnvironment())
  }

  // public get environmentsService(): EnvironmentsRequestService {
  //   return this._environmentsService ?? new EnvironmentsRequestService()
  // }

  // public get environmentService(): EnvironmentRequestService {
  //   return this._environmentService ?? new EnvironmentRequestService()
  // }

  @CheckActiveEnvironment
  getEntities(): Observable<EntityModel[]> {
    return this.environmentService.getEntities(this.activeEnvironment.apiUrl)
  }

  getEnvironments(): Observable<EnvironmentModel[]> {
    return this.environmentsService.getAvailableUserEnvironments()
  }

  setActiveEnvironment(environment: EnvironmentModel): void {
    this.environmentsService.setActiveEnvironment(environment)
  }

  getActiveEnvironment(): Observable<EnvironmentModel> {
    return this.environmentsService.getActiveEnvironment()
  }

  removeActiveEnvironment(): void {
    this.environmentsService.removeActiveEnvironment()
  }


  private _getActiveEnvironment(): void {
    this.environmentsService.getActiveEnvironment().subscribe(env => {
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
    return originalMethod.apply(this);
  };

  return descriptor;
}
