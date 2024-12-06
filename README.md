# TP Agiles


Backend Coverage: [Report](https://html-preview.github.io/?url=https://github.com/eliseograncelli/TP_Agiles/blob/main/backend/logic/cover.html#ec600507-849d-5f0c-a0b2-d76d4f61c4fa)

Para hacer:

- [X] Unit Tests usando TDD 
- [x] Single Repository
- [x] CI Server que solo compile (Github Actions, Azure DevOps, TravisCI, etc)
- [x] CI Server ejecute los Unit Tests
- [x] CI Server deploye a Producción
- [x] CI Server ejecuta Análisis Estático de Código 
- [x] CI Server muestre resultados de Code Coverage
- [x] Desarrollar UI Web con Acceptance Test (al menos 4)
- [x] CI Server ejecute los AT

Extras:
- [] FEATURE: Que no sea case sensitive !!!
- [] FEATURE: no mostrar palabra repetidas repetidas !!!
- [] Tener test de integracion ?????
- [ ] Mejorar la UI ????????


Como ver los Test en Interfaz web:
```bash
go install github.com/smartystreets/goconvey@latest 
cd backend/logic
goconvey 

