import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { CrudService } from '../services/crud.service';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { Session } from '../model/session';
import { User } from '../model/user';
import { environment } from '../../../environments/environment';

export const authGuard: CanActivateFn = (route, state) => {
  const storage = inject(StorageService);
  const crud = inject(CrudService);
  const router = inject(Router);
  const token = storage.getItem('JWT_Fake');
  const negado = (): Observable<boolean> => {
    router.navigate(['auth']);
    storage.clear();
    return of(false);
  };

  if (token) {
    return isTokenValid(crud, token).pipe(
      switchMap(session => {
        if (session) {
          if (environment.user?.id != session.userId) {
            return crud.getID('users', session.userId).pipe(
              map((user:User) => {
                environment.user = user;
                return true;
              }),
              catchError(negado)
            );
          }else{ return of(true); }
        } else { return negado(); }
      }),
      catchError(negado)
    );
  } else { return negado(); }
};


const isTokenValid = (crud: CrudService<Session>, token: string): Observable<Session | null> => {
  return crud.get('sessions').pipe(
    map(sessions => {
      const session = sessions.find(s => s.token === token);
      return session || null;
    }),
    catchError(() => of(null))
  );
};