import * as postController from '../controller/postController'; // 컨트롤러 함수들 import
import { IncomingMessage, ServerResponse } from 'http';

// Todo 목록 조회
export const getTodoList = (req: IncomingMessage, res: ServerResponse) => {
  postController.getTodoList(req, res); // getTodoList 함수 호출
};

// Todo 생성
export const createTodoList = (req: IncomingMessage, res: ServerResponse) => {
  postController.createTodoList(req, res); // createTodoList 함수 호출
};

// Todo 세부 정보 조회
export const getTodoListDetail = (req: IncomingMessage, res: ServerResponse) => {
  postController.getTodoListDetail(req, res); // getTodoListDetail 함수 호출
};

// Todo 수정
export const updateTodoList = (req: IncomingMessage, res: ServerResponse) => {
  postController.updateTodoList(req, res); // updateTodoList 함수 호출
};

// Todo 삭제
export const deleteTodoList = (req: IncomingMessage, res: ServerResponse) => {
  postController.deleteTodoList(req, res); // deleteTodoList 함수 호출
};
