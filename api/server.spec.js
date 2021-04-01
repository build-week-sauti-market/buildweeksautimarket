const request = require("supertest");
const server = require("./server");

describe('server.js', () => {
    
   // test for GET
    describe('GET /', () => {

        it('returns 200 OK', () => {
            return request(server)
                .get('/')
                .then(res => {
                expect(res.status).toBe(200);
            });
        });
        
        it("should return {Welcome to sauti-market API Lambda Team# 86 } ", () => {
            return request(server)
                .get('/')
                .then(res => {
                    
                    expect(res.body.api).toBe("Welcome to sauti-market API Lambda Team# 86 ")
                    expect(res.body).toEqual({ api: "Welcome to sauti-market API Lambda Team# 86 " })
                })
        });

        it('returns JSON', done => {
            return request(server)
                .get('/')
                .then(res => {
                expect(res.type).toMatch(/json/i);
                done();
            });
        });
    });
});