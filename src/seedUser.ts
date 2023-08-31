import { UserEntity } from "./modules/user/entity/user.entity";
import { AppDataSource } from "./data-source";
import { makeUserId } from "./modules/user/model/user.id";
import { hashPassword } from "./utility/passwordUtils";

export const seedUser = async () => {

    const userRepo = AppDataSource.getRepository(UserEntity);

    const cnt = await userRepo.count();
    const seedPassword = await hashPassword("A112345!a");

    if (cnt === 0) {
        await
            userRepo.save({
                id: makeUserId(),
                username: "testasger",
                email: "login_test@gmail.com",
                password: seedPassword,
                firstName: "testfirstname",
                lastName: "testlastname",
                bio: "test bio",
                avatar: "test avatar",
                isPrivate: false,
            })
    }
}