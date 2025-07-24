import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header implements OnInit {
navigateConditionally() {
throw new Error('Method not implemented.');
}
  data: any = {};
  currentUrl: string = '';

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authSvc.tokenData$.subscribe((data: any) => {
      this.data = data;
    });

    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
    });
  }

  onLogout(): void {
    this.authSvc.logout();
    this.data = null;
    
    // Lógica de redirección exacta como la necesitas
    if (this.isOnUserPage()) {
        this.router.navigate(['/home']);  // /usuarios → /home
    } else {
        this.navegarLogin();  // /home u otras → /auth
    }
}

navegarLogin(): void {
    this.router.navigate(['/auth']);
}

// Helpers optimizados
isOnUserPage(): boolean {
    return this.currentUrl.includes('/usuarios');  // Detecta /usuarios o subrutas
}

isOnLoginPage(): boolean {
    return this.currentUrl.includes('/auth');  // Detecta /auth o subrutas
}
}