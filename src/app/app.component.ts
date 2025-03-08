import {Component, inject} from '@angular/core';
import {
  Event as NavigationEvent,
  NavigationStart,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from './services/auth.service';
import {filter, map} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatButtonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './app.component.html',
  host: {
    class: 'app-root'
  }
})
export class AppComponent {
  public readonly authService = inject(AuthService);
  private readonly _router = inject(Router);

  protected currentUrl = toSignal(this._router.events.pipe(
    filter((event: NavigationEvent) => event instanceof NavigationStart),
    map((event: NavigationStart) => event.url)
  ));
}
