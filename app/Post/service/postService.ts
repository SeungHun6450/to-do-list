import { PrismaClient } from '@prisma/client';

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
    const todos = await prisma.todoTable.findMany(); // Prisma를 통해 모든 Todo 항목을 가져옵니다.
    return todos;
  } catch (error) {
    console.error('Error getting Todo list:', error);
    throw new Error('Unable to fetch Todo list');
  }
};

// Todo를 생성하는 함수
export const createTodo = async ({ title, description }: TableProps) => {
  try {
    const newTodo = await prisma.todoTable.create({
      data: {
        title: title,
        description: description,
      },
    });
    return newTodo;
  } catch (error) {
    console.error('Error creating Todo:', error);
    throw new Error('Unable to create Todo');
  }
};

// Todo 세부 정보를 조회하는 함수
export const getTodoById = async ({ id }: TableProps) => {
  try {
    const todo = await prisma.todoTable.findUnique({
      where: { id: id },
    });
    return todo;
  } catch (error) {
    console.error('Error getting Todo by ID:', error);
    throw new Error('Unable to fetch Todo by ID');
  }
};

// Todo를 수정하는 함수
export const updateTodo = async ({ id, title, description, isComplete }: TableProps) => {
  try {
    const updatedTodo = await prisma.todoTable.update({
      where: { id: id },
      data: {
        title: title,
        description: description,
        isComplete: isComplete,
        updatedAt: new Date(), // 수정 시 업데이트 날짜 추가
      },
    });
    return updatedTodo;
  } catch (error) {
    console.error('Error updating Todo:', error);
    throw new Error('Unable to update Todo');
  }
};

// Todo를 삭제하는 함수
export const deleteTodo = async ({ id }: TableProps) => {
  try {
    const deletedTodo = await prisma.todoTable.delete({
      where: { id: id },
    });
    return deletedTodo;
  } catch (error) {
    console.error('Error deleting Todo:', error);
    throw new Error('Unable to delete Todo');
  }
};
