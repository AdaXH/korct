// import { server } from '../../server';

import server from '../../server';

export default async () => {
  beforeAll(async () => {
    await server.startServer();
  });
};
