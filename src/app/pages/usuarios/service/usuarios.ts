import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { DefaultResponse } from '../../../shared/models/default.interface';
import { UsuarioResponse } from '../../../shared/models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  getUsuarios(): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(`${environment.API_URL}/usuarios`)
      .pipe(catchError((error) => this.handlerError(error)));
  }

  newUsuario(usuario: UsuarioResponse): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`${environment.API_URL}/usuarios`, usuario)
      .pipe(catchError((error) => this.handlerError(error)));
  }

  updateUsuario(usuario: UsuarioResponse): Observable<DefaultResponse> {
    return this.http.put<DefaultResponse>(`${environment.API_URL}/usuarios`, usuario)
      .pipe(catchError((error) => this.handlerError(error)));
  }

  deleteUsuario(cveUsuario: number): Observable<DefaultResponse> {
    return this.http.delete<DefaultResponse>(`${environment.API_URL}/usuarios/${cveUsuario}`)
      .pipe(catchError((error) => this.handlerError(error)));
  }
handlerError(error: any): Observable<never> {
  let errorMessage = "Ocurrió un error";

  if (error?.error?.mensaje) {
    errorMessage = `Error: ${error.error.mensaje}`;
  } else if (error?.message) {
    errorMessage = `Error: ${error.message}`;
  } else if (typeof error === 'string') {
    errorMessage = `Error: ${error}`;
  }

  console.error('Detalle del error:', error); // MUY importante para depurar

  this.snackBar.open(errorMessage, '', {
    duration: 5000,
    panelClass: ['error-snackbar'],
    horizontalPosition: 'end',
    verticalPosition: 'top'
  });

  return throwError(() => new Error(errorMessage));
}

}