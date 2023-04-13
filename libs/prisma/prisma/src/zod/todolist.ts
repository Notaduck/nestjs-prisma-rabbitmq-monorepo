import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"
import * as imports from "../../null"
import { CompleteUser, RelatedUserModel, CompleteOrganization, RelatedOrganizationModel, CompleteTodoItem, RelatedTodoItemModel, CompleteTodoListShare, RelatedTodoListShareModel } from "./index"

export const TodoListModel = z.object({
  id: z.number().int(),
  name: z.string(),
  ownerId: z.number().int(),
  organizationId: z.number().int().nullish(),
})

export class TodoListDto extends createZodDto(TodoListModel) {
}

export interface CompleteTodoList extends z.infer<typeof TodoListModel> {
  owner: CompleteUser
  organization?: CompleteOrganization | null
  items: CompleteTodoItem[]
  sharedUsers: CompleteUser[]
  todoListShares: CompleteTodoListShare[]
}

/**
 * RelatedTodoListModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTodoListModel: z.ZodSchema<CompleteTodoList> = z.lazy(() => TodoListModel.extend({
  owner: RelatedUserModel,
  organization: RelatedOrganizationModel.nullish(),
  items: RelatedTodoItemModel.array(),
  sharedUsers: RelatedUserModel.array(),
  todoListShares: RelatedTodoListShareModel.array(),
}))
