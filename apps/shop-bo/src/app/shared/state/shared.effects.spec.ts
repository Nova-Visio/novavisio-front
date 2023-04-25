import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

import { SharedEffects } from './shared.effects';

describe('SharedEffects', () => {
  let actions$: Observable<any>;
  let effects: SharedEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SharedEffects,
        provideMockActions(() => actions$),
        provideMockStore({}),
        HttpClient
      ],
      imports: [],
    });

    effects = TestBed.inject(SharedEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
