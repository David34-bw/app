// src/tasks/dto/create-task.dto.ts
import { IsNotEmpty, IsEnum } from 'class-validator';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsEnum(TaskPriority)
  priority: TaskPriority;
}
