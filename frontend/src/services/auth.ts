import { Injectable, signal, computed, inject } from '@angular/core'; // Added inject here
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

// 1. Add this interface so TypeScript knows what "response" is
interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly TOKEN_KEY = 'portfolio_admin_token';
  private readonly API_URL = 'https://localhost:7143/api/auth/login';

  #token = signal<string | null>(localStorage.getItem(this.TOKEN_KEY));
  isLoggedIn = computed(() => !!this.#token());

  login(credentials: { username: string; password: string }) {
    // 2. Add <LoginResponse> here to clear the redline
    return this.http.post<LoginResponse>(this.API_URL, credentials).pipe(
      tap((response) => {
        // Now 'response.token' is recognized!
        localStorage.setItem(this.TOKEN_KEY, response.token);
        this.#token.set(response.token);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.#token.set(null);
  }

  getToken() {
    return this.#token();
  }
}