import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IState } from '../models/state.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AppState {
  updateOrders(orders: unknown) {
    throw new Error('Method not implemented.');
  }
  private state$ = new BehaviorSubject<IState>(this.loadState());

  constructor(private router: Router) {}

  getState$(): Observable<IState> {
    return this.state$;
  }

  getState(): IState {
    const state = this.state$.getValue();
    // console.log('Current state:', state); // Debug log
    return state;  }

  setState(data: Partial<IState>): void {
    const currentState = this.getState();
    const newState = { ...currentState, ...data };
    // console.log('Setting new state:', newState); // Debug log
    this.state$.next(newState);
    this.saveState(newState);
  }

  private saveState(state: IState): void {
    sessionStorage.setItem('appState', JSON.stringify(state));
  }

  private loadState(): IState {
    const state = sessionStorage.getItem('appState');
    return state ? JSON.parse(state) : this.getDefaultState();
  }

  private getDefaultState(): IState {
    return {
      loading: false,
      user: {},
      token: '',
      refreshToken: '',
      roles: [],
      customers: [],
      artisans: [],
      permissions: [],
      transactions: [],
      withdrawals: [],
      advertisements: [],
      admins: [],
      companies: [],
      complaints: [],
      orders: [],
      updateOrders: [],
      categories: [],
      trainCategories: [],
      artisanCategory: [],
      companyCategory: [],
      isAuthenticated: false,
    };
  }

  logout(): void {
    this.setState({
      token: '',
      refreshToken: '',
      isAuthenticated: false,
    });
    this.router.navigate(['/auth/login']);
  }
}
