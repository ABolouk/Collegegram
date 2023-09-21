import { DataSource, Repository } from "typeorm";
import { UserInteractionEntity } from "./entity/user-interaction";
import {z} from "zod"
import { InteractionInterface, UserInteractionInterface } from "./model/user-interaction";
import { zodUserInteractionDao } from "./dao/user-interaction.dao";

export class UserInteractionRepository {
  private userInteractionRepo: Repository<UserInteractionEntity>;
  constructor(appDataSource: DataSource) {
    this.userInteractionRepo = appDataSource.getRepository(UserInteractionEntity);
  }

  async findByTwoUserId(userInteraction: InteractionInterface): Promise<UserInteractionInterface | null> {

    return this.userInteractionRepo
      .findOneBy([{ userId1: userInteraction.userId1, userId2: userInteraction.userId2 }, { userId1: userInteraction.userId2, userId2: userInteraction.userId1 }])
      .then((x) => z.nullable(zodUserInteractionDao).parse(x))
  }

  creatUserInteraction(userInteraction: InteractionInterface) {
    return this.userInteractionRepo.save(userInteraction).then((x) => zodUserInteractionDao.parse(x))
  }

  deleteUserInteractionById(userInteractionId: number) {
    return this.userInteractionRepo.delete({
      id: userInteractionId
    })
  }

}