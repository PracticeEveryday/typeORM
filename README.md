1. typeorm 패키지 설치
   yarn add typeorm -D

2. reflect-metadata 설치
   yarn add reflect-metadata -D

3. SQL 유형에 맞게 설치
   yarn add mysql -D

4. tsconfig 설정
   "emitDecoratorMetadata": true,
   "experimentalDecorators": true,

5. TypeORM을 시작하는 가장 빠른 방법은 CLI 명령을 사용하여 시작 프로젝트를 생성하는 것입니다.
   npx typeorm init --name MyProject --database mysql
