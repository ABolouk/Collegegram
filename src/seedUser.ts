// import { UserEntity } from "./modules/user/entity/user.entity";
// import { AppDataSource } from "./data-source";
// import {v4} from "uuid";
// import { makeUserId } from "./modules/user/model/user.id";
// export const seedUser = async () => {

//     const userRepo = AppDataSource.getRepository(UserEntity);

//     const cnt = await userRepo.count();

//     if (cnt === 0) {
//             await
//             userRepo.save({
//                 id: makeUserId(),
//                 username: "test",
//                 email: "login_test@gmail.com",
//                 password: "123456",
//                 firstName: "test firstname",
//                 lastName: "test lastname",
//                 bio: "test bio",
//                 avatar: "test avatar",
//                 isPrivate: false,
//             })
//         }
//     }