import { DataSource, Repository } from "typeorm";
import { TagEntity } from "./entity/tag.entity";
import { CreateTagInterface, TagInterface } from "./model/tag";
import { zodTagDao } from "./dao/tag.dao";
import { TagTitle } from "./model/tag-title";

export class TagRepository {
    private tagRepo: Repository<TagEntity>;
    constructor(private appDataSource: DataSource) {
        this.tagRepo = appDataSource.getRepository(TagEntity);
    }

    async create(tag: CreateTagInterface): Promise<TagInterface> {
        return zodTagDao.parse(await this.tagRepo.save(tag));
    }

    async findByTitle(title: TagTitle): Promise<TagInterface> {
        return zodTagDao.parse(await this.tagRepo.findOneBy({ title }));
    }
}