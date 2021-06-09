import createServer from './createServer';
export default async () => {
  var server = null;
  beforeAll(async () => {
    server = await createServer();
  });

  afterAll(() => {
    server.close();
  });
};
