import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

export const QUERY_BUILDER_COMPONENT_URL: string = '/querybuilder';

@Component({
  selector: 'app-query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QueryBuilder implements OnInit {

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
    this.navigationService.handleUrlParamOnComponentInit(QUERY_BUILDER_COMPONENT_URL)
  }
}