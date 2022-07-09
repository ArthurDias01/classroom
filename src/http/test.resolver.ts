import { Controller, Get, UseGuards } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";
import { AuthorizationGuard } from "./auth/authorization.guard";
import { Resolver, Query } from "@nestjs/graphql";

@Resolver()
export class TestResolver {
  constructor(private prisma: PrismaService) { }

  @Query(() => String)
  @UseGuards(AuthorizationGuard)
  hello() {
    return 'Hello World!';
  }
}
