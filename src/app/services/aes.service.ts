import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AesService {

  private apiUrlCifrar = 'http://127.0.0.1:8000/cifrar_texto_AES/';
  private apiUrlDecifrar = 'http://127.0.0.1:8000/decifrar_texto_AES/';

  private apiUrlDecifrarRSA = 'http://127.0.0.1:8000/decifrar_texto_RSA/';
  private apiUrlcifrarRSA = 'http://127.0.0.1:8000/cifrar_texto_RSA/';

  constructor(private http: HttpClient) {}

  cifrarTextoAES(jsonData: any): Observable<any> {
    return this.http.post<any>(this.apiUrlCifrar, jsonData);
  }

  decifrarTextoAES(jsonData: any): Observable<any> {
    return this.http.post<any>(this.apiUrlDecifrar, jsonData);
  }

  cifrarTextoRSA(jsonData: any): Observable<any> {
    return this.http.post<any>(this.apiUrlcifrarRSA, jsonData);
  }

  decifrarTextoRSA(jsonData: any): Observable<any> {
    return this.http.post<any>(this.apiUrlDecifrarRSA, jsonData);
  }
}



