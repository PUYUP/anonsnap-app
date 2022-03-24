import { CommentEffects } from './effects/comment/comment.effects';
import { CoreEffects } from './effects/core/core.effects';
import { LocationEffects } from './effects/location/location.effects';
import { MomentEffects } from './effects/moment/moment.effects';
import { ReactionEffects } from './effects/reaction/reaction.effects';
import { TagEffects } from './effects/tag/tag.effects';
import { UserEffects } from './effects/user/user.effects';

export const AppEffects = [
  LocationEffects,
  UserEffects,
  MomentEffects,
  CommentEffects,
  TagEffects,
  CoreEffects,
  ReactionEffects,
];
