import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserEnvironmentModel } from '../models/user-environment-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  
  constructor(private http: HttpClient) { }

  environmentsList!: UserEnvironmentModel[];

  // @Output() onSelectEnvironment = new EventEmitter<string>();

  ngOnInit() {
    this.getListOfEnvironments(environment.apiConfig.uri);
  }

  getListOfEnvironments(url: string){
    let result: UserEnvironmentModel[] = []

    this.http.get(url).subscribe(response => {  
      let environments = (response as any).value
      for (let env of environments) {
        result.push({ apiUrl: env.ApiUrl, friendlyName: env.FriendlyName, url: env.Url, urlName: env.UrlName })
      }
    });
    this.environmentsList = result
  }

  selectEnvironment(envUrl: string){
    // this.onSelectEnvironment.emit(envUrl)

    
  }
}