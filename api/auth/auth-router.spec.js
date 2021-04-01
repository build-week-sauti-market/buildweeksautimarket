const server = require('../server')
const request = require('supertest');

beforeEach(prepTestDB);

describe('Auth router', () => {
    it('Post /api/auth/register', async () => {
        const register = {
            username: 'Jasicaaaa',
            password: ("abc1231"),
            location: 'Califronia',
           
        }

        const res = await request(server)
            .post('api/auth/login')
            .send(register)
        expect(res.status).toBe(404)
    })

    it('get /api/auth/register', async () => {
        const register = {
            username: 'Jasicaaaa',
            password: ("abc1231"),
            location: 'California',
            
        }
        const res = await request(server)
            .get('users')
        expect(res.status).toBe(200)
        expect(res.body[1]).toEqual(register)
        expect(res.type).toMatch(/json/)
    })

})