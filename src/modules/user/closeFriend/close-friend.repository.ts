import {CloseFriendEntity} from "./closeFriend.entity";
import {DataSource, Repository} from "typeorm";
import {CloseFriendRelationInterface, createCloseFriendRelation} from "./model/close-friend";
import {zodCloseFriendDao} from "./dao/close-friend.dao";

export class CloseFriendRepository {

    private closeFriendRepo: Repository<CloseFriendEntity>;

    constructor(private appDataSource: DataSource) {
        this.closeFriendRepo = appDataSource.getRepository(CloseFriendEntity);
    }

    async createCloseFriendRelation(closeFriendRelation: createCloseFriendRelation): Promise<CloseFriendRelationInterface> {
        return await this.closeFriendRepo.save({
            userId: closeFriendRelation.userId,
            closeFriendId: closeFriendRelation.closeFriendId,
        }).then((x) => zodCloseFriendDao.parse(x))
    }

    async findCloseFriendRelation(closeFriendRelation: CloseFriendRelationInterface): Promise<CloseFriendRelationInterface | null> {
        return await this.closeFriendRepo.findOneBy({
            userId: closeFriendRelation.userId,
            closeFriendId: closeFriendRelation.closeFriendId,
        }).then((x) => zodCloseFriendDao.parse(x))
    }

    async deleteCloseFriendRelation(closeFriendRelation: CloseFriendRelationInterface){
        await this.closeFriendRepo.delete({
            userId: closeFriendRelation.userId,
            closeFriendId: closeFriendRelation.closeFriendId,
        })
    }
}