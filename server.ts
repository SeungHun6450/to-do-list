import { createServer } from 'http';
import * as postRouter from './app/Post/route/postRoute'; // 라우터 import

const server = createServer(async (req, res) => {
  const url = req.url;
  const method = req.method;

  // 기본적으로 JSON 응답 설정
  res.setHeader('Content-Type', 'application/json');

  // 라우터를 사용하여 요청 처리
  if (url?.startsWith('/todos')) {
    switch (method) {
      case 'GET':
        if (url === '/todos') {
          postRouter.getTodoList(req, res);
        } else if (url.startsWith('/todos/')) {
          postRouter.getTodoListDetail(req, res);
        }
        break;
      case 'POST':
        if (url === '/todos') {
          postRouter.createTodoList(req, res);
        }
        break;
      case 'PUT':
        if (url.startsWith('/todos/')) {
          postRouter.updateTodoList(req, res);
        }
        break;
      case 'DELETE':
        if (url.startsWith('/todos/')) {
          postRouter.deleteTodoList(req, res);
        }
        break;
    }
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

// 서버 실행
const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
