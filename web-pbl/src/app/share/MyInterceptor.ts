import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, mergeMap} from "rxjs/operators";
import {CommonService} from "../services/common.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MyInterceptor implements HttpInterceptor {
  constructor(
    private commonService: CommonService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // @ts-ignore
    let req = request.clone({param1: '', param2: ''});//这里可以在请求中加参数
    // @ts-ignore
    return next.handle(req).pipe(mergeMap((event: any) => {
        // 正常返回，处理具体返回参数
        if (event instanceof HttpResponse && event.status === 200)
          return this.handleData(event);//具体处理请求返回数据
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err))
    )
  }

  handleData(
    event: HttpResponse<any> | HttpErrorResponse,
  ): Observable<any> {
    // 业务处理：一些通用操作
    switch (event.status) {
      case 200:
        return of(event);
      case 401: // 权限不足
        this.commonService.goToUnauthorizedPage();
        return of(event);
      case 404:
        break;
      case 500:
        break;
      default:
        return of(event);
    }
  }
}
