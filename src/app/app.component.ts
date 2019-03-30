import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Metrika } from 'ng-yandex-metrika';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'numerolog';

  constructor(
    private metrika: Metrika,
    private router: Router,
    private loc: Location
  ) {
    let prevPath = this.loc.path();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const newPath = this.loc.path();
        this.metrika.hit(newPath, { referer: prevPath });
        prevPath = newPath;
      });
  }
}
