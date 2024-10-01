import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';

@Controller('students')
@UseGuards(RolesGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  @Roles('admin', 'user')
  async findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user')
  async getById(@Param('id') id: string): Promise<Student> {
    return this.studentService.findById(id);
  }

  @Post()
  @Roles('admin')
  async create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentService.create(createStudentDto);
  }

  @Put(':id')
  @Roles('admin')
  async update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto): Promise<Student> {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  @Roles('admin')
  async delete(@Param('id') id: string): Promise<Student> {
    return this.studentService.delete(id);
  }
}
