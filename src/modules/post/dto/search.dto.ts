import { z } from 'zod';
import { UserId } from '../../user/model/user.id';
import { Tag } from '../tag/dto/tag.dto';
import { TagTitle } from '../tag/model/tag-title';

export const SearchDto = z.object({
  userId: UserId.zod,
  tag: TagTitle.zod,
  limit: z.coerce.number().nonnegative().min(1).max(20),
  startTime: z.coerce.date()
});

export type SearchDtoType = z.infer<typeof SearchDto>;