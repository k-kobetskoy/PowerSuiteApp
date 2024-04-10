import { Inject, Injectable } from '@angular/core';
import { MSAL_GUARD_CONFIG, MSAL_INTERCEPTOR_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalInterceptorConfiguration, MsalService } from '@azure/msal-angular';
import { EventMessage, InteractionStatus, RedirectRequest, PopupRequest, AuthenticationResult, EventType } from '@azure/msal-browser';
import { BehaviorSubject, Subject, filter, takeUntil, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isIframe = false;
  private _loginDisplay = false;

  public get userIsLoggedIn() {
    return this._loginDisplay;
  }
  
  private _userIsLoggedIn$ = new BehaviorSubject<boolean>(false);

  public get userIsLoggedIn$() {
    return this._userIsLoggedIn$.asObservable();
  }

  private _userAdded$ = new BehaviorSubject<boolean>(false);

  public get userAdded$() {
    return this._userAdded$.asObservable();
  }

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    @Inject(MSAL_INTERCEPTOR_CONFIG) private msalInterceptorConfig: MsalInterceptorConfiguration,
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService) {    
  }

  private readonly _destroying$ = new Subject<void>();

  init() {
    this.isIframe = window !== window.parent && !window.opener; // Remove this line to use Angular Universal   
    this.setLoginDisplay()

    this.msalService.instance.enableAccountStorageEvents(); // Optional - This will enable ACCOUNT_ADDED and ACCOUNT_REMOVED events emitted when a user logs in or out of another tab or window
    this.msalBroadcastService.msalSubject$
      .pipe(filter((msg: EventMessage) => msg.eventType === EventType.ACCOUNT_ADDED || msg.eventType === EventType.ACCOUNT_REMOVED))
      .subscribe((result: EventMessage) => {
        if(result.eventType === EventType.ACCOUNT_ADDED){
          this._userAdded$.next(true)
        }
        if (this.msalService.instance.getAllAccounts().length === 0) {
          window.location.pathname = "/";
        } else {        
          this.setLoginDisplay();
        }
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {        
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      })

    this.msalBroadcastService.msalSubject$.subscribe({
      next: (eventMsg) => {
        if (eventMsg.eventType === EventType.ACQUIRE_TOKEN_FAILURE) {
          this._userIsLoggedIn$.next(false)
        }
      }
    })
  }

  setLoginDisplay() {
    let newValue = this.msalService.instance.getAllAccounts().length > 0
    let oldValue = this._loginDisplay
    if(newValue!=oldValue){
      this._loginDisplay = newValue    
      this._userIsLoggedIn$.next(this._loginDisplay)
    }
  }

  checkAndSetActiveAccount() {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this.msalService.instance.getActiveAccount();

    if (!activeAccount && this.msalService.instance.getAllAccounts().length > 0) {
      let accounts = this.msalService.instance.getAllAccounts();
      this.msalService.instance.setActiveAccount(accounts[0]);
    }
  }

  loginRedirect() {
    if (this.msalGuardConfig.authRequest) {
      this.msalService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
    } else {
      this.msalService.loginRedirect();
    }
  }

  loginPopup() {
    if (this.msalGuardConfig.authRequest) {
      this.msalService.loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
          this.msalService.instance.setActiveAccount(response.account);
        });
    } else {
      this.msalService.loginPopup()
        .subscribe((response: AuthenticationResult) => {
          this.msalService.instance.setActiveAccount(response.account);
        });
    }
    this.setLoginDisplay()
  }

  logout(popup?: boolean) {
    if (popup) {
      this.msalService.logoutPopup({
        mainWindowRedirectUri: "/"
      });
    } else {
      this.msalService.logoutRedirect();
    }
    this.setLoginDisplay()
  }

  addProtectedResourceToInterceptorConfig(resource: string, permissionScopes: string[]) {
    this.msalInterceptorConfig.protectedResourceMap.set(resource, permissionScopes)
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
