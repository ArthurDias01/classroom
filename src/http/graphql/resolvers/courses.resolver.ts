import { UseGuards, UnauthorizedException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { CoursesService } from '../../../services/courses.service';
import { EnrollmentsService } from '../../../services/enrollments.service';
import { StudentsService } from '../../../services/students.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/current-user';
import { CreateCourseInput } from '../inputs/create-course-input';
import { Course } from '../models/course';




@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private cousesService: CoursesService,
    private enrollmentsService: EnrollmentsService,
    private studentsService: StudentsService,
  ) { }


  @UseGuards(AuthorizationGuard)
  @Query(() => [Course])
  courses() {
    return this.cousesService.listAllCourses();
  }

  @UseGuards(AuthorizationGuard)
  @Query(() => Course)
  async course(
    @Args('id') id: string,
    @CurrentUser() user: AuthUser
  ) {
    const student = await this.studentsService.getStudentByAuthUserId(user.sub);

    if (!student) {
      throw new Error('Student not found');
    }

    const enrollment = await this.enrollmentsService.getEnrollmentByCourseAndStudentId({
      courseId: id,
      studentId: student.id,
    });

    if (!enrollment) {
      throw new UnauthorizedException();
    }

    return this.cousesService.getCourseById(id);
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  createCourse(
    @Args('data') data: CreateCourseInput
  ) {
    return this.cousesService.createCourse(data);
  }
}
