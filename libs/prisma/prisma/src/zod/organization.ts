import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"
import * as imports from "../../null"
import { CompleteUser, RelatedUserModel, CompleteTodoList, RelatedTodoListModel } from "./index"

export const OrganizationModel = z.object({
  id: z.number().int(),
  name: z.string(),
})

export class OrganizationDto extends createZodDto(OrganizationModel) {
}

export interface CompleteOrganization extends z.infer<typeof OrganizationModel> {
  users: CompleteUser[]
  todoLists: CompleteTodoList[]
}

/**
 * RelatedOrganizationModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrganizationModel: z.ZodSchema<CompleteOrganization> = z.lazy(() => OrganizationModel.extend({
  users: RelatedUserModel.array(),
  todoLists: RelatedTodoListModel.array(),
}))
