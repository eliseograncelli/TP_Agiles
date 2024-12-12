# TP Agiles: Hangman

Team members:
- Bruno Mollo 
- Eliseo Grancelli


## Requirements to run the proyect:
- git 
- node.js
- pnpm
- go cli

## Tests Backend

To run the test, you have to navegarte to the `backend/logic` folder and run the tests:
```bash
cd backend/logic
go test -v
```

If you what a web interface to see the test results, you can use the `goconvey` tool:
```bash
go install github.com/smartystreets/goconvey@latest 
goconvey 
```

You can see the code that has been covered by the tests in [this report](https://html-preview.github.io/?url=https://github.com/eliseograncelli/TP_Agiles/blob/main/frontend/logic/cover.html#ec600507-849d-5f0c-a0b2-d76d4f61c4fa).
It is automatically updated using a github action.



## Tests Frontend

To run the test, you have to navegarte to the `frontend` folder and run the tests:
```bash
cd frontend
pnpm i # install the dependencies (just once)
pnpm test:unit # run the unit tests in the frontend 
pnpm lint # run eslint to find errors in the code statically
pnpm check  # uses the typescript complier to check there are no type errors 
```

## Aceptance Tests
To run the acceptance test you have to start the backend and then run the script on the frontend to start the Playwright tests:
```bash
cd backend
go run . 
cd ..
cd frontend
pnpm run test:e2e
```


## Integration Tests
The integration tests are in the `integration` folder, you have to fisrt start the backend and then run the tests:
```bash
cd backend
go run . 
cd ..
cd integration 
pnpm i
pnpm run test:integration
```


## CI/CD
```bash
All checks were successful
0 cancelled, 0 failing, 12 successful, 0 skipped, and 0 pending checks

   NAME                                                DESCRIPTION               ELAPSED  
✓  E2E/Acceptance Tests (20) (pull_request)                                      46s      
✓  Integration/Integration Tests (20) (pull_request)                             27s      
✓  Svelte/Format Frontend Code (20) (pull_request)                               10s      
✓  Svelte/Check Build of Frontend (20) (pull_request)                            12s      
✓  Svelte/Lint Frontend Code (20) (pull_request)                                 14s      
✓  Svelte/TypeScript Checks (20) (pull_request)                                  15s      
✓  Svelte/Unit Tests in Frontend (20) (pull_request)                             11s      
✓  Go/Format Backend Code (pull_request)                                         7s       
✓  Go/Check that Backends Compiles (pull_request)                                25s      
✓  Go/Unit Tests in Backend (pull_request)                                       18s      
✓  Vercel                                              Deployment has completed           
✓  Vercel Preview Comments                                                                
```

