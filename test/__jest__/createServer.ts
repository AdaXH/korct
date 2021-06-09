import server from '../../server';

export default async () => {
  await server.startServer();
  return server.server;
};
