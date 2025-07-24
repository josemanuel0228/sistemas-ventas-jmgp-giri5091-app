import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { BaseForm } from '../../shared/utils/base form';
import { AuthService } from '../../shared/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.html',
  styleUrl: './auth.scss'
})
export class Auth  implements OnInit, OnDestroy{
  hide = true;

  private destroy$ = new Subject<any>();
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });
  constructor(private fb: FormBuilder, 
              public baseForm: BaseForm,
              private authSvc: AuthService,
              private router: Router
            ) {
  }
  ngOnInit(): void {
  }

  onSubmit(){
    // Verificar que el formulario sea correcto
    if (this.loginForm.invalid) return;

    // si todo el fomulario es correcto obtener el usuario y contraseña para enviarlos
    const form = this.loginForm.value;

    this.authSvc.login(form).pipe(takeUntil(this.destroy$)).subscribe( (data) => {
      this.router.navigate(['/home']);

    });

    console.log(form);
  }
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
    
  }

}
