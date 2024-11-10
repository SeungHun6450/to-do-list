import { createServer } from 'http';
import { postRoute } from './Post/route/postRoute.ts';

const server = createServer(async (req, res) => {
  await postRoute(req, res);
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
