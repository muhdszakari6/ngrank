import { Component, OnDestroy } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router, Event, RouterEvent, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  loading: boolean;
  title = 'Angularank';
  loaderSubscription: Subscription

  constructor(
    private router: Router
  ) {
    this.loading = false

    this.loaderSubscription = router.events.subscribe(
      (event: Event) => {
        if (event instanceof RouteConfigLoadStart) {
          this.loading = true
        } else if (event instanceof RouteConfigLoadEnd) {
          this.loading = false
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.loaderSubscription.unsubscribe();
  }


}
