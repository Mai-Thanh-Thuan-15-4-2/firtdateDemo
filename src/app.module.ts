import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://20130127:dsYmJMLalA0O2Q8O@database1.twpymwy.mongodb.net/StudentManage?retryWrites=true&w=majority&appName=Database1'),
    StudentModule,
  ],
})
export class AppModule {}
