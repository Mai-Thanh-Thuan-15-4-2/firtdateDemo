import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { StudentService } from './student.service';
import { Student } from './student.schema';
import { Model } from 'mongoose';

const mockStudent = {
  name: 'Nguyen Van A',
  age: 20,
  email: 'nguyenvana@example.com',
};

const studentsArray = [
  mockStudent,
  {
    name: 'Tran Thi B',
    age: 21,
    email: 'tranthib@example.com',
  },
  {
    name: 'Le Van C',
    age: 22,
    email: 'levanc@example.com',
  },
];

describe('StudentService', () => {
  let service: StudentService;
  let model: Model<Student>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getModelToken(Student.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockStudent),
            constructor: jest.fn().mockResolvedValue(mockStudent),
            find: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndRemove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
    model = module.get<Model<Student>>(getModelToken(Student.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new student', async () => {
    jest.spyOn(model, 'create').mockResolvedValueOnce(mockStudent as any);
    const newStudent = await service.create(mockStudent);
    expect(newStudent).toEqual(mockStudent);
  });

  it('should return all students', async () => {
    jest.spyOn(model, 'find').mockResolvedValueOnce(studentsArray as any);
    const students = await service.findAll();
    expect(students).toEqual(studentsArray);
  });

  it('should update a student', async () => {
    const updatedStudent = { ...mockStudent, name: 'Nguyen Van B' };
    jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce(updatedStudent as any);
    const result = await service.update('someId', updatedStudent);
    expect(result).toEqual(updatedStudent);
  });

  it('should delete a student', async () => {
    jest.spyOn(model, 'findByIdAndDelete').mockResolvedValueOnce(mockStudent as any);
    const result = await service.delete('someId');
    expect(result).toEqual(mockStudent);
  });
});
