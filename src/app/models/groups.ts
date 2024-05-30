import { GroupDetails } from "./group-details";
import { Users } from "./users";

export interface Groups {
    groupId : number,
    groupDetails : GroupDetails,
    users : Users[]
}
