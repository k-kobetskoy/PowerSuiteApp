import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Angular 16 - MSAL Angular v3 Sample';
  isIframe: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.init()
    this.isIframe = window !== window.parent && !window.opener; // Remove this line to use Angular Universal    
  }
}