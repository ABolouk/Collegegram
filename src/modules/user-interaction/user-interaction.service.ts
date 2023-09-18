import { UserId } from "../user/model/user.id";
import { UserInteractionRepository } from "./user-interaction.repository";

export class USerInteractionService{
  constructor(private userInteractionRepo: UserInteractionRepository) { }
  
  async getOrCreateUserInteraction(firstUserId: UserId, secondUserId: UserId) {  //FIXME: 
    const interaction = this.ifExistInteraction(firstUserId, secondUserId)
    if (!interaction){
      const createInteraction = {
        userId1: firstUserId,
        userId2: secondUserId
      }

      return await this.userInteractionRepo.creatUserInteraction(createInteraction)
    }
    return interaction
  }

  async ifExistInteraction(firstUserId: UserId, secondUserId: UserId) {
    const userInteraction = await this.userInteractionRepo.findByTwoUserId(firstUserId, secondUserId)
    if (!userInteraction) {
      return null
    }
    return userInteraction
  }

  async deleteUserInteraction(firstUserId: UserId, secondUserId: UserId) { //FIXME: 
    const interaction = await this.ifExistInteraction(firstUserId, secondUserId)
    if (interaction !== null) {
      return await this.userInteractionRepo.deleteUserInteractionById(interaction.id)
    }
    return null
  }
}