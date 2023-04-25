import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { sharedFeatureKey } from './state/shared.state-model';
import { reducer } from './state/shared.reducer';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature(sharedFeatureKey, reducer)],
})
export class SharedModule {}
