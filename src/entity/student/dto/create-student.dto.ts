import {
    IsEmail,
    IsString,
    Matches,
    MaxLength,
    MinLength,
 } from "class-validator";

export class CreateStudentDto {

    @IsString()
    nome: string;
    
    @IsString()
    matricula: string;

    @IsEmail()
    email: string;
    
    @IsString()
    @MinLength(4)
    @MaxLength(10)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
    password: string; 
    
}
