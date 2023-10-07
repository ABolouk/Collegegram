import {UserEntity} from "./modules/user/entity/user.entity";
import {AppDataSource} from "./data-source";
import {UserId} from "./modules/user/model/user.id";
import {Password} from "./utility/password-utils";


export const seedUser = async () => {

    const userRepo = AppDataSource.getRepository(UserEntity);
    const userCnt = await userRepo.count();
    const temp = "A112345!a";
    let seedPassword;
    if (Password.is(temp)) {
        seedPassword = await Password.makeHashed(temp);
    }
    if (userCnt === 0) {
        await userRepo.save([{
            id: UserId.make(),
            username: "testasger",
            email: "login_test@gmail.com",
            password: seedPassword,
            firstName: "testfirstname",
            lastName: "testlastname",
            bio: "test bio",
            avatar: "test avatar",
            isPrivate: false,
        }, {
            id: UserId.make(),
            username: "bbjfdj",
            email: "hilbbjadddi_aa@yahoo.com",
            password: seedPassword,
            isPrivate: false,
        }, {
            id: UserId.make(),
            username: "bbjfkkdj",
            email: "hilbbjai_aa@yahoo.com",
            password: seedPassword,
            isPrivate: true,
        }, {
            id: UserId.make(),
            username: "mainblock",
            email: "amirhosseinbolouk@gmail.com",
            password: seedPassword,
            isPrivate: true,
        }]);
    }


}