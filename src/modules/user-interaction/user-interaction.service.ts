import { UserId } from "../user/model/user.id";
import { InteractionInterface, UserInteractionInterface } from "./model/user-interaction";
import { UserInteractionRepository } from "./user-interaction.repository";

export class USerInteractionService {
  constructor(private userInteractionRepo: UserInteractionRepository) { }

  async createUserInteraction(interaction: InteractionInterface): Promise<UserInteractionInterface> { 
    const createInteraction = {
      userId1: interaction.userId1,
      userId2: interaction.userId2
    }

    return await this.userInteractionRepo.creatUserInteraction(createInteraction)
  }

  async getInteraction(interaction: InteractionInterface) : Promise<UserInteractionInterface | null>{
    const userInteraction = await this.userInteractionRepo.findByTwoUserId(interaction)
    if (!userInteraction) {
      return null
    }
    return userInteraction
  }

  async deleteUserInteraction(interaction: InteractionInterface) {
    const userInteraction = await this.getInteraction(interaction)
    if (userInteraction !== null) {
      return await this.userInteractionRepo.deleteUserInteractionById(userInteraction.id)
    }
    return null
  }
}