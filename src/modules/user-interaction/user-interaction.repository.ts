import { DataSource, Repository } from "typeorm";
import { UserInteractionEntity } from "./entity/user-interaction";
import { UserId } from "../user/model/user.id";
import { CreateUserInteraction, userInteractionId } from "./model/user-interaction";

export class UserInteractionRepository{
  private userInteractionRepo: Repository<UserInteractionEntity>;
  constructor(appDataSource: DataSource) {
    this.userInteractionRepo = appDataSource.getRepository(UserInteractionEntity);
  }

  async findByTwoUserId(firstUserId: UserId, secondUserId: UserId){
    // userInteraction = this.userInteractionRepo.findBy({
    //   where({userId1 === firstUserId})
    // })

    const userInteraction = await this.userInteractionRepo.createQueryBuilder("userInteraction") //FIXME: 
      .where({
      userId1 : firstUserId, userId2: secondUserId
    }).getOne()

    return userInteraction
  }

  creatUserInteraction(userInteraction: CreateUserInteraction) {
    return this.userInteractionRepo.save(userInteraction)
  }

  deleteUserInteractionById(userInteractionId: number) {
    return this.userInteractionRepo.delete({
      id: userInteractionId
    })
  }

}