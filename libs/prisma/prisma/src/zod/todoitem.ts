import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"
import * as imports from "../../null"
import { CompleteTodoList, RelatedTodoListModel } from "./index"

export const TodoItemModel = z.object({
  id: z.number().int(),
  name: z.string(),
  priority: z.number().int(),
  todoListId: z.number().int(),
})

export class TodoItemDto extends createZodDto(TodoItemModel) {
}

export interface CompleteTodoItem extends z.infer<typeof TodoItemModel> {
  todoList: CompleteTodoList
}

/**
 * RelatedTodoItemModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTodoItemModel: z.ZodSchema<CompleteTodoItem> = z.lazy(() => TodoItemModel.extend({
  todoList: RelatedTodoListModel,
}))
