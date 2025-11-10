// src/tasks/tasks.service.ts
import { Injectable } from '@nestjs/common';
import { CreateTaskDto, TaskStatus, TaskPriority } from './dto/create-task.dto';

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
}

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private idCounter = 1;

  create(taskDto: CreateTaskDto): Task {
    const task = { id: this.idCounter++, ...taskDto };
    this.tasks.push(task);
    return task;
  }

  findAll(status?: TaskStatus, priority?: TaskPriority): Task[] {
  const s = status ? status.toString().toLowerCase() as TaskStatus : undefined;
  const p = priority ? priority.toString().toLowerCase() as TaskPriority : undefined;

  return this.tasks.filter(task => {
    if (s && task.status !== s) return false;
    if (p && task.priority !== p) return false;
    return true;
  });
}

  findOne(id: number): Task | null {
  return this.tasks.find(task => task.id === id) || null;
  }

  update(id: number, updateTask: Partial<CreateTaskDto>): Task | null {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return null;
    Object.assign(task, updateTask);
    return task;
  }

  remove(id: number): boolean {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    this.tasks.splice(index, 1);
    return true;
  }
}
