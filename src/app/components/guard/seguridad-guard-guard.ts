import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Loginservice } from '../../services/login-service'; 

export const seguridadGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loginService = inject(Loginservice);

  if (loginService.verificar()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};