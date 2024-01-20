import { Controller, Get, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard, Resource, ResourceGuard, Roles, Unprotected } from "nest-keycloak-connect";



@Controller()
@UseGuards(AuthGuard, ResourceGuard)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('public')
    @Unprotected()
    getPublic(): string {
        return `${this.userService.getHello()} from public`
    }

    @Get('user')
    @Roles({ roles: ['user'] })
    getUser(): string {
        return `${this.userService.getHello()} from user`;
    }

    @Get('/admin')
    @Roles({ roles: ['admin'] })
    getAdmin(): string {
        return `${this.userService.getHello()} from admin`;
    }

}