import { inject } from 'aurelia-framework';
import { Redirect } from 'aurelia-router';
import { AuthService } from 'aurelia-authentication';
import jwtDecode from 'jwt-decode';

@inject(AuthService)
export class AuthenticateStep {
  constructor(authService) {
    this.authService = authService;
  }

  run(routingContext, next) {
    const isLoggedIn = this.authService.authenticated;
    const loginRoute = this.authService.config.loginRoute;
    const forbiddenRoute = "/forbidden";

    if (routingContext.getAllInstructions().some(route => route.config.auth === true)) {
      if (!isLoggedIn) {
        return next.cancel(new Redirect(loginRoute));
      }
      else if (isLoggedIn && routingContext.getAllInstructions().some(route => {
        if ([forbiddenRoute].indexOf(route.fragment) >= 0)
          return false;

        const config = this.authService.authentication.config;
        const storage = this.authService.authentication.storage;
        const token = JSON.parse(storage.get(config.storageKey));
        var user = jwtDecode(token.data);

        var routeSettings = route.config.settings || {};
        var routeRoles = routeSettings.roles || [];
        var userRoles = user.roles;
        userRoles.push("*");

        return routeRoles.some(role => {
          return userRoles.indexOf(role) < 0;
        })
      })) {
        return next.cancel(new Redirect(forbiddenRoute));
      }
    }
    else if (isLoggedIn && routingContext.getAllInstructions().some(route => [loginRoute].indexOf(route.fragment) >= 0)) {
      return next.cancel(new Redirect(this.authService.config.loginRedirect));
    }
    // else if (isLoggedIn && routingContext.getAllInstructions().some(route => [forbiddenRoute].indexOf(route.fragment) >= 0)) {
    //   return next.cancel(new Redirect(forbiddenRoute));
    // }

    return next();
  }
}
