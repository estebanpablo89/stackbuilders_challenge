const request = require('supertest');
const app = require('../app');

const correctFormat = 'ABC0000 21-02-2021 09:00';
const errorMessage =
  'error in data, input format should be ABC0000 31-01-2019 15:59';
const successMsg = 'Allowed to drive';
const failMsg = 'Not allowed to drive';

describe('License plate', () => {
  it('returns 200 OK when a request is made', async () => {
    const response = await request(app)
      .post('/api/licenses')
      .send({ data: correctFormat });
    expect(response.status).toBe(200);
  });

  it('returns data message when a valid input is made', async () => {
    const response = await request(app)
      .post('/api/licenses')
      .send({ data: correctFormat });
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
  });

  it('returns data message with valid license', async () => {
    const response = await request(app)
      .post('/api/licenses')
      .send({ data: correctFormat });
    expect(response.status).toBe(200);
    expect(response.body.data.license).toBeDefined();
  });

  it('returns data message with valid date', async () => {
    const response = await request(app)
      .post('/api/licenses')
      .send({ data: correctFormat });
    expect(response.status).toBe(200);
    expect(response.body.data.date).toBeDefined();
  });

  it('returns error message if license is not valid', async () => {
    const response = await request(app)
      .post('/api/licenses')
      .send({ data: 'ABC00009 2021-02-28 09:00' });
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toBe(errorMessage);
  });

  it('returns error message if date is not valid (not recognized character)', async () => {
    const response = await request(app)
      .post('/api/licenses')
      .send({ data: 'ABC0000 28asdf 09:00' });
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toBe(errorMessage);
  });

  it('returns error message if date is not in valid format (month first)', async () => {
    const response = await request(app)
      .post('/api/licenses')
      .send({ data: 'ABC0000 02-15-2021 09:00' });
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toBe(errorMessage);
  });

  it('returns status message if input is correct', async () => {
    const response = await request(app)
      .post('/api/licenses')
      .send({ data: correctFormat });
    expect(response.status).toBe(200);
    expect(response.body.data.info).toBeDefined();
  });

  it('returns success message if allowed to drive (sunday)', async () => {
    const response = await request(app)
      .post('/api/licenses')
      .send({ data: 'ABC0000 21-02-2021 09:00' });
    expect(response.status).toBe(200);
    expect(response.body.data.info).toBe(successMsg);
  });

  it('returns fail message if not allowed to drive (monday)', async () => {
    const response = await request(app)
      .post('/api/licenses')
      .send({ data: 'ABC0001 08-02-2021 09:00' });
    expect(response.status).toBe(200);
    expect(response.body.data.info).toBe(failMsg);
  });

  it('returns success message if allowed to drive (time not in range)', async () => {
    const response = await request(app)
      .post('/api/licenses')
      .send({ data: 'ABC0001 08-02-2021 10:00' });
    expect(response.status).toBe(200);
    expect(response.body.data.info).toBe(successMsg);
  });

  it('returns fail message if not allowed to drive (wednesday)', async () => {
    const response = await request(app)
      .post('/api/licenses')
      .send({ data: 'ABC0005 10-02-2021 19:00' });
    expect(response.status).toBe(200);
    expect(response.body.data.info).toBe(failMsg);
  });
});
