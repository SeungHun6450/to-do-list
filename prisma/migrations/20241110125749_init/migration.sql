-- CreateTable
CREATE TABLE "TodoTable" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT DEFAULT '',
    "desciption" TEXT DEFAULT '',
    "isComplete" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentTable" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT DEFAULT '',
    "todoId" BIGINT,

    CONSTRAINT "CommentTable_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommentTable" ADD CONSTRAINT "CommentTable_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "TodoTable"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
