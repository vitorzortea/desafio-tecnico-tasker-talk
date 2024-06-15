import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  /* Na Pratica não tem efeito esse Interceptor, fiz para ser avaliad caso fosse um sistema real com JWT */
  const token = sessionStorage.getItem('JWT_Fake');
  if (token) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(clonedReq);
  }
  return next(req);
};
