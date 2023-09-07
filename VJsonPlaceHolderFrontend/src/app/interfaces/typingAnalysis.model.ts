import { User } from "../_interfaces/user.model";
import { Score } from "./score.model";
import Typing from "./typing.model";

export interface TypingAnalysis {
    Id: string,
    Content: string,
    CreateAt: string,
    Typing: Typing,
    User: User,
    Score: Score,
    TimeFrame: string;
}