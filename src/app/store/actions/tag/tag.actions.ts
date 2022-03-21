import { createAction, props } from '@ngrx/store';

export const loadTags = createAction(
  '[Tag] Load Tags',
  props<{ filter?: any }>()
);

export const loadTagsSuccess = createAction(
  '[Tag] Load Tags Success',
  props<{ data: any; filter?: any }>()
);

export const loadTagsFailure = createAction(
  '[Tag] Load Tags Failure',
  props<{ error: any; filter?: any }>()
);
