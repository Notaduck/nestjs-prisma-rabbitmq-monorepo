import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"
import * as imports from "../../null"
import { CompleteOrganization, RelatedOrganizationModel, CompleteTodoList, RelatedTodoListModel, CompleteTodoListShare, RelatedTodoListShareModel } from "./index"

export const UserModel = z.object({
  id: z.number().int(),
  name: z.string(),
  organizationId: z.number().int().nullish(),
  email: z.string().nullish(),
})

export class UserDto extends createZodDto(UserModel) {
}

export interface CompleteUser extends z.infer<typeof UserModel> {
  organization?: CompleteOrganization | null
  todoLists: CompleteTodoList[]
  sharedTodoLists: CompleteTodoList[]
  todoListShares: CompleteTodoListShare[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  organization: RelatedOrganizationModel.nullish(),
  todoLists: RelatedTodoListModel.array(),
  sharedTodoLists: RelatedTodoListModel.array(),
  todoListShares: RelatedTodoListShareModel.array(),
}))
