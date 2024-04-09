// Assuming you've resolved the ESM issue from our earlier conversation... 
const chai = require('chai'); 
const chaiHttp = require('chai-http');
const sinon = require('sinon'); 
const dbFunctions = require('../../../dbFunctions/AccountFunctions'); 
const authTokenFunctions = require('../../../dbFunctions/authTokenFunctions');
const { v4: uuidv4 } = require("uuid"); 

const app = require('../../../index'); // Replace with your app file

chai.use(chaiHttp);
const { expect } = chai;

describe("Accounts",  function () {
    let loginRequest;
    let authToken;
    let refreshToken;
    beforeEach(async function    () {

          loginRequest = await chai.request(app).post('/accounts/login').send({ uname: 'K', password: 'Kosti$1' });
        //console.log('loginRequest:', loginRequest.body);
         authToken = loginRequest.body.authToken;
        
    });

    describe("GET /refreshToken", function () {
        let refreshTokenStub;
      
        beforeEach(function () {
          
        });
      
        it("Refreshes token successfully", async function () {
            
        
            const refreshRequest = await chai.request(app)
              .get('/accounts/refreshToken').set('Authorization', `Bearer ${authToken}`).set('Cookie', `Refresh-Token=${loginRequest.body.refreshToken.token}`);
        
            expect(refreshRequest.status).equal(200);
            expect(refreshRequest.body).to.have.property('authToken');
            expect(refreshRequest.body).to.have.property('updatedToken');
            
            authToken=refreshRequest.body.authToken;
            refreshToken=refreshRequest.body.updatedToken.token;
            //expect(refreshTokenStub.refreshToken).toHaveBeenCalled();
          });

        

        it ("Fails to refresh token if we dont have refreshToken", async function () {
            const refreshRequest = await chai.request(app)
              .get('/accounts/refreshToken').set('Authorization', `Bearer ${authToken}`);
        
            expect(refreshRequest.status).equal(401);
            
            
          });
        
         
        });



    describe("POST /", function () {
        
        it("Creates an account successfully", async function () {
            const accountData = {
                name: 'TEST',
                email: uuidv4(),
                password: 'Kosti$1',
                uname: uuidv4(),
                subscriptionFrequency: 'M',
                plan: 'PROFESSIONAL',
                timeZone: 'EST',
                selectedOption: 'GOLD',
                demoSelected: false,
                expirationDate: '2024-04-09T11:26:22.921Z',
                language: '',
                role: 'admin'
            };
            const createRequest = await chai.request(app).post('/accounts/').send(accountData).set('Authorization', `Bearer ${authToken}`).set('Cookie', `Refresh-Token=${refreshToken}`);
           // console.log('createRequest:', createRequest.body);
           console.log("refreshToken:", refreshToken);
            expect(createRequest.status).equal(201);


      });

      it("Returns 400  in case of same username", async function () {
        const accountData = {
            name: 'TEST',
            email: uuidv4(),
            password: 'Kosti$1',
            uname: "K",
            subscriptionFrequency: 'M',
            plan: 'PROFESSIONAL',
            timeZone: 'EST',
            selectedOption: 'GOLD',
            demoSelected: false,
            expirationDate: '2024-04-09T11:26:22.921Z',
            language: '',
            role: 'admin'
        };
        const createRequest = await chai.request(app).post('/accounts/').send(accountData).set('Authorization', `Bearer ${authToken}`).set('Cookie', `Refresh-Token=${refreshToken}`);
       // console.log('createRequest:', createRequest.body);
       
        expect(createRequest.status).equal(400);
        expect (createRequest.text).equal('Username already exists');
        


      });

      it("Returns 400  in case of same username", async function () {
        const accountData = {
            name: 'TEST',
            email: "1232222@gmail.com",
            password: 'Kosti$1',
            uname: uuidv4(),
            subscriptionFrequency: 'M',
            plan: 'PROFESSIONAL',
            timeZone: 'EST',
            selectedOption: 'GOLD',
            demoSelected: false,
            expirationDate: '2024-04-09T11:26:22.921Z',
            language: '',
            role: 'admin'
        };
        const createRequest = await chai.request(app).post('/accounts/').send(accountData).set('Authorization', `Bearer ${authToken}`).set('Cookie', `Refresh-Token=${refreshToken}`);
      // console.log('createRequest:', createRequest.body);
      
        expect(createRequest.status).equal(400);
        expect (createRequest.text).equal('Email already exists');
        


      });

    });
    describe("DELETE /logout", function () {

        it("Logs out successfully", async function () {
            const logoutRequest = await chai.request(app)
              .delete('/accounts/logout').set('Authorization', `Bearer ${authToken}`).set('Cookie', `Refresh-Token=${loginRequest.body.refreshToken.token}`);
        
            expect(logoutRequest.status).equal(200);
           
          });

        

    });

});

  

