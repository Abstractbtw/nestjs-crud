import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { NotesModule } from './notes/notes.module'

const config = require("config")

const user = config.get('username')
const pass = config.get('password')
const db = config.get('database')


@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": `${user}`,
      "password": `${pass}`,
      "database": `${db}`,
      "entities": ["dist/**/*.entity{.ts,.js}"],
      "synchronize": true
    }),
    NotesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
