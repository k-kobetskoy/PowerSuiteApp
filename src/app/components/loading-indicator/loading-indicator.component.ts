import { Component, HostBinding, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LoadingIndicationService } from 'src/app/components/loading-indicator/services/loading-indication.service';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoadingIndicatorComponent implements OnInit, OnDestroy {

  @HostBinding('style.display') display: string
  @Input() diameter: number

  sub: Subscription
  loading$: Observable<boolean>

  constructor(private loadingService: LoadingIndicationService) {
    this.sub = this.loadingService.loading$.subscribe(data => {
      if (data) {
        this.display = 'flex'
      } else {
        this.display = 'none'
      }
    })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  ngOnInit() {
  }
}
