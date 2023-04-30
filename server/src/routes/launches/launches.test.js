const request = require('supertest');
const app = require('../../app');
const { connectDB, disconnectDB } = require('../../services/mongo');

describe('Launches API', () => {
  beforeAll(async () => {
    await connectDB();
  });

  describe('Test GET /launches', () => {
    it('Should responde with 200 success', async () => {
      await request(app)
        .get('/v1/launches')
        .send()
        .expect('Content-Type', /json/)
        .expect(200);
      // expect(response.status).toBe(200);
    });
  });

  describe('Test POST /launches', () => {
    const completeLaunch = {
      mission: 'ZTM155',
      rocket: 'ZTM Experimental IS1',
      launchDate: 'January 17, 2030',
      target: 'Kepler-186 f',
    };

    it('Should respond with 200 success', async () => {
      const response = await request(app)
        .post('/v1/launches')
        .send(completeLaunch)
        .expect('Content-Type', /json/)
        .expect(201);

      const requestDate = new Date(completeLaunch.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();

      expect(requestDate).toBe(responseDate);

      delete completeLaunch.launchDate;
      expect(response.body).toMatchObject(completeLaunch);
    });

    it('Should catch missing required property', async () => {
      delete completeLaunch.launchDate;
      const response = await request(app)
        .post('/v1/launches')
        .send(completeLaunch)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: 'Missing required launch property',
      });
    });

    it('Should catch invalid dates', async () => {
      completeLaunch.launchDate = 'zoot';
      const response = await request(app)
        .post('/v1/launches')
        .send(completeLaunch)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: 'Invalid launch date',
      });
    });
  });

  afterAll(async () => {
    await disconnectDB();
  });
});
