import { IncomingMessage, ServerResponse } from 'http';
import * as postService from '../service/postService'; // 서비스 파일 import

// Todo 목록 조회
export const getTodoList = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const todos = await postService.getTodoList(); // 서비스에서 데이터 가져오기
    res.end(JSON.stringify(todos));
  } catch (error) {
    console.log(error);
  }
};

// Todo 생성
export const createTodoList = async (req: IncomingMessage, res: ServerResponse) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', async () => {
    try {
      const { title, description } = JSON.parse(body);
      const newTodo = await postService.createTodoList({ title, description });
      res.end(JSON.stringify(newTodo));
    } catch (error) {
      console.log(error);
    }
  });
};

// Todo 세부 정보 조회
export const getTodoListDetail = async (req: IncomingMessage, res: ServerResponse) => {
  const id = req.url?.split('/')[2]; // URL에서 id 추출
  try {
    const todo = await postService.getTodoListDetail({ id: parseInt(id || '') });
    res.end(JSON.stringify(todo));
  } catch (error) {
    console.log(error);
  }
};

// Todo 수정
export const updateTodoList = async (req: IncomingMessage, res: ServerResponse) => {
  const id = req.url?.split('/')[2]; // URL에서 id 추출
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', async () => {
    try {
      const { title, description, isComplete } = JSON.parse(body);
      const updatedTodo = await postService.updateTodoList({
        id: parseInt(id || ''),
        title,
        description,
        isComplete,
      });
      res.end(JSON.stringify(updatedTodo));
    } catch (error) {
      console.log(error);
    }
  });
};

// Todo 삭제
export const deleteTodoList = async (req: IncomingMessage, res: ServerResponse) => {
  const id = req.url?.split('/')[2]; // URL에서 id 추출
  try {
    const deletedTodo = await postService.deleteTodoList({ id: parseInt(id || '') });
    res.end(JSON.stringify(deletedTodo));
  } catch (error) {
    console.log(error);
  }
};
