import { Controller, Get, Post, Body, Patch, Param, Delete,Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto,} from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto'; 


@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

   @Get()
  findAll(
    @Query('status') status?: string,
    @Query('priority') priority?: string,
  ) {
    // opcional: normalizar y eliminar espacios
    const s = status?.trim().toLowerCase();
    const p = priority?.trim().toLowerCase();

    console.log('Query filters received:', { s, p }); // para depurar
    return this.tasksService.findAll(s as any, p as any);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
