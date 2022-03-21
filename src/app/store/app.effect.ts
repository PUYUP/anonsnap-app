import { CommentEffects } from './effects/comment/comment.effects';
import { LocationEffects } from './effects/location/location.effects';
import { MomentEffects } from './effects/moment/moment.effects';
import { TagEffects } from './effects/tag/tag.effects';
import { UserEffects } from './effects/user/user.effects';

export const AppEffects = [
  LocationEffects,
  UserEffects,
  MomentEffects,
  CommentEffects,
  TagEffects,
];
