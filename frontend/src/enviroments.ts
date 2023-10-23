import { HttpHeaders } from '@angular/common/http';

export const Enviroment = {
  production: true,
  urls: {
    auth: "/api/user/",
    client: "/api/client/",
    user: "/api/user/",
    httpOptions: {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      }),
      responseType: 'json' as const,
    }
  }
}