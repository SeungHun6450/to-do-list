import { createServer } from 'http';
import {
  getTodoList,
  createTodoList,
  getTodoListDetail,
  updateTodoList,
  deleteTodoList,
} from './Post/service/postService'; // 서비스 파일 import

const server = createServer(async (req, res) => {
  const url = req.url;
  const method = req.method;

  // 기본적으로 JSON 응답 설정
  res.setHeader('Content-Type', 'application/json');

  // GET /todos - Todo 목록 조회
  if (method === 'GET' && url === '/todos') {
    try {
      const todos = await getTodoList();
      res.end(JSON.stringify(todos));
    } catch (error) {
      console.log(error);
    }
  }
  // POST /todos - 새로운 Todo 생성
  if (method === 'POST' && url === '/todos') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const { title, description } = JSON.parse(body);
        const newTodo = await createTodoList({ title, description });
        res.end(JSON.stringify(newTodo));
      } catch (error) {
        console.log(error);
      }
    });
  }
  // GET /todos/:id - Todo 세부 정보 조회
  if (method === 'GET' && url.startsWith('/todos/')) {
    const id = url.split('/')[2]; // URL에서 id 추출
    try {
      const todo = await getTodoListDetail({ id: parseInt(id) });

      res.end(JSON.stringify(todo));
    } catch (error) {
      console.log(error);
    }
  }
  // PUT /todos/:id - Todo 수정
  if (method === 'PUT' && url.startsWith('/todos/')) {
    const id = url.split('/')[2]; // URL에서 id 추출
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const { title, description, isComplete } = JSON.parse(body);
        const updatedTodo = await updateTodoList({
          id: parseInt(id),
          title,
          description,
          isComplete,
        });
        res.end(JSON.stringify(updatedTodo));
      } catch (error) {
        console.log(error);
      }
    });
  }
  // DELETE /todos/:id - Todo 삭제
  if (method === 'DELETE' && url.startsWith('/todos/')) {
    const id = url.split('/')[2]; // URL에서 id 추출
    try {
      const deletedTodo = await deleteTodoList({ id: parseInt(id) });
      res.end(JSON.stringify(deletedTodo));
    } catch (error) {
      console.log(error);
    }
  }
});

// 서버 실행
const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
