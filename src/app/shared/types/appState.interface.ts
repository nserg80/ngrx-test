import { AuthStateInterface } from "src/app/auth/types/authState.interface";
import { FeedService } from "../modules/feed/services/feed.service";

export interface AppStateInterface {
    auth: AuthStateInterface,
    feed: FeedService
}