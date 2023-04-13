-- DropForeignKey
ALTER TABLE "TodoList" DROP CONSTRAINT "TodoList_organizationId_fkey";

-- AlterTable
ALTER TABLE "TodoList" ALTER COLUMN "organizationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TodoList" ADD CONSTRAINT "TodoList_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
