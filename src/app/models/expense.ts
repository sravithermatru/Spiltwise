import { ExpenseDetail } from "./expense-detail";
import { Users } from "./users";

export interface Expense {
    expenseId : number,
    groupId : number,
    usersPaid : Users[],
    usersInvolved : Users[],
    expenseDetails : ExpenseDetail
}
