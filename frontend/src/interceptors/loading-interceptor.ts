import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(SpinnerService);

  //check if it's the specific GET request for the WHOLE list (Home Page)
  // Logic: URL ends in '/projects' and method is 'GET'
  const isProjectListFetch = req.url.endsWith('/projects') && req.method === 'GET';

  if (isProjectListFetch) {
    // Show Skeletons on Home Page
    spinner.startFetching(); 
  } else {
    // Show Glass Spinner for everything else:
    // /projects/1 (Details), /auth/login, POST /projects, DELETE /projects, etc.
    spinner.show(); 
  }

  return next(req).pipe(
    finalize(() => {
      // safely call both to ensure the UI is unlocked regardless of what happened
      spinner.stopFetching();
      spinner.hide();
    })
  );
};