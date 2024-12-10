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


## Extras:
- [] FEATURE: Que no sea case sensitive !!!



