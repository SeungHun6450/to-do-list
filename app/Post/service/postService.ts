import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Todo 목록 조회
export const getTodoList = async () => {
  // TodoTable에서 모든 Todo 항목을 조회합니다.
  return await prisma.todoTable.findMany();
};

// Todo 생성
export const createTodoList = async ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  // 새로운 Todo 항목을 TodoTable에 추가합니다.
  return await prisma.todoTable.create({
    data: {
      title,
      description,
    },
  });
};

// Todo 세부 정보 조회
export const getTodoListDetail = async ({ id }: { id: number }) => {
  // 특정 Todo 항목을 TodoTable에서 조회합니다.
  return await prisma.todoTable.findUnique({
    where: { id },
    include: {
      CommentTable: true, // Todo와 관련된 댓글도 포함하여 조회
    },
  });
};

// Todo 수정
export const updateTodoList = async ({
  id,
  title,
  description,
  isComplete,
}: {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}) => {
  // Todo 항목을 업데이트합니다.
  return await prisma.todoTable.update({
    where: { id },
    data: {
      title,
      description,
      isComplete,
      updatedAt: new Date(), // 수정 시 updatedAt을 갱신
    },
  });
};

// Todo 삭제
export const deleteTodoList = async ({ id }: { id: number }) => {
  // Todo 항목을 삭제합니다.
  return await prisma.todoTable.delete({
    where: { id },
  });
};
