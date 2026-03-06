import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error) => {
      // Identify the message (Try backend detail first, then status, then fallback)
      let message = 'An unexpected error occurred';
      
      if (error.status === 401) {
        message = 'Invalid Username or Password'; // Specific for Login
      } else if (error.error?.detail) {
        message = error.error.detail;
      } else if (error.message) {
        message = error.message;
      }

      // show toast (Removing the !== 401 check)
      toastr.error(message, `SYSTEM ERROR! [${error.status}]`, {
      });

      // Keep the error flowing so the Component can still show 'errorMessage'
      return throwError(() => error);
    })
  );
};