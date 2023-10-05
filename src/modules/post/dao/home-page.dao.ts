import { HomePagePosts } from "../model/home-page"

export const zodHomePagePostsDao = HomePagePosts.zod.transform((x): HomePagePosts => x)


