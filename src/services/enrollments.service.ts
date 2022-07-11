import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

export interface GetByCourseAndStudentIdParams {
  courseId: string;
  studentId: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(
    private prisma: PrismaService,
  ) { }

  listAllEnrollments() {
    return this.prisma.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        createdAt: "desc",
      }
    });
  }

  getEnrollmentByCourseAndStudentId({ courseId, studentId }: GetByCourseAndStudentIdParams) {
    return this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        canceledAt: null,
      },
    });
  }

  listStudentsEnrollmentsByStudent(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null,
      },
      orderBy: {
        createdAt: "desc",
      }
    });
  }
}
