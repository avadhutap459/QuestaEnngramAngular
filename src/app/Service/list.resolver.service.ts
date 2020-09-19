import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable()
export class ListResolverService implements Resolve<any>{
    constructor(private _userSvc : UserService){

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
        return this._userSvc.getuserClaims().pipe(
            take(1),
            map((profile: any) => profile));
        
    }
}


