import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"
import * as imports from "../../null"
import { CompleteTodoList, RelatedTodoListModel, CompleteUser, RelatedUserModel } from "./index"

export const TodoListShareModel = z.object({
  id: z.number().int(),
  todoListId: z.number().int(),
  userId: z.number().int(),
  permission: z.string(),
})

export class TodoListShareDto extends createZodDto(TodoListShareModel) {
}

export interface CompleteTodoListShare extends z.infer<typeof TodoListShareModel> {
  todoList: CompleteTodoList
  user: CompleteUser
}

/**
 * RelatedTodoListShareModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTodoListShareModel: z.ZodSchema<CompleteTodoListShare> = z.lazy(() => TodoListShareModel.extend({
  todoList: RelatedTodoListModel,
  user: RelatedUserModel,
}))
