import { PrismaClient } from '@prisma/client';

// Prisma Client 인스턴스 생성
const prisma = new PrismaClient();

interface TableProps {
  id?: number;
  title?: string;
  description?: string;
  isComplete?: boolean;
}

// Todo 목록을 조회하는 함수
export const getTodoList = async () => {
  try {
    const res = await prisma.todoTable.findMany();
    return res;
  } catch (error) {
    console.error('Error getting Todo list:', error);
    throw new Error('Unable to fetch Todo list');
  }
};

// Todo를 생성하는 함수
export const createTodoList = async ({ title, description }: TableProps) => {
  try {
    const res = await prisma.todoTable.create({
      data: {
        title,
        description,
      },
    });
    return res;
  } catch (error) {
    console.error('Error creating Todo:', error);
    throw new Error('Unable to create Todo');
  }
};

// Todo 세부 정보를 조회하는 함수
export const getTodoListDetail = async ({ id }: TableProps) => {
  try {
    const res = await prisma.todoTable.findUnique({
      where: { id },
    });
    return res;
  } catch (error) {
    console.error('Error getting Todo by ID:', error);
    throw new Error('Unable to fetch Todo by ID');
  }
};

// Todo를 수정하는 함수
export const updateTodoList = async ({ id, title, description, isComplete }: TableProps) => {
  try {
    const res = await prisma.todoTable.update({
      where: { id },
      data: {
        title,
        description,
        isComplete,
        updatedAt: new Date(),
      },
    });
    return res;
  } catch (error) {
    console.error('Error updating Todo:', error);
    throw new Error('Unable to update Todo');
  }
};

// Todo를 삭제하는 함수
export const deleteTodoList = async ({ id }: TableProps) => {
  try {
    const res = await prisma.todoTable.delete({
      where: { id },
    });
    return res;
  } catch (error) {
    console.error('Error deleting Todo:', error);
    throw new Error('Unable to delete Todo');
  }
};
