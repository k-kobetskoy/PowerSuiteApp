import { Inject, Injectable } from '@angular/core';
import { MSAL_GUARD_CONFIG, MSAL_INTERCEPTOR_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalInterceptorConfiguration, MsalService } from '@azure/msal-angular';
import { EventMessage, InteractionStatus, RedirectRequest, PopupRequest, AuthenticationResult, EventType } from '@azure/msal-browser';
import { BehaviorSubject, Subject, filter, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isIframe = false;
  loginDisplay = false;

  private _userIsLoggedIn$ = new BehaviorSubject<boolean>(false);
  
  public get userIsLoggedIn$() {
    return this._userIsLoggedIn$;
  }

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    @Inject(MSAL_INTERCEPTOR_CONFIG) private msalInterceptorConfig: MsalInterceptorConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService) { }

  private readonly _destroying$ = new Subject<void>();

  init() {
    this.isIframe = window !== window.parent && !window.opener; // Remove this line to use Angular Universal
    this.setLoginDisplay();

    this.authService.instance.enableAccountStorageEvents(); // Optional - This will enable ACCOUNT_ADDED and ACCOUNT_REMOVED events emitted when a user logs in or out of another tab or window
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.ACCOUNT_ADDED || msg.eventType === EventType.ACCOUNT_REMOVED),
      )
      .subscribe((result: EventMessage) => {
        if (this.authService.instance.getAllAccounts().length === 0) {
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
        console.log()
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      })

      this.msalBroadcastService.msalSubject$.subscribe({
        next:(msalSubject)=>{
          if(msalSubject.eventType ==='msal:acquireTokenFailure'){
            this._userIsLoggedIn$.next(false)
          }
        }
      })
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
    this._userIsLoggedIn$.next(this.loginDisplay)
  }

  checkAndSetActiveAccount() {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  loginRedirect() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  loginPopup() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
        });
    } else {
      this.authService.loginPopup()
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
        });
    }
    this.setLoginDisplay() 
  }

  logout(popup?: boolean) {
    if (popup) {
      this.authService.logoutPopup({
        mainWindowRedirectUri: "/"
      });
    } else {
      this.authService.logoutRedirect();
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
