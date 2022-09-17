import bcrypt from 'bcrypt';
import { issueJWT } from '../config/issueJWT.js';
import { StudentModel } from "../schemas/student.schema.js";
import { BadRequestException, NotFoundException } from "../utilities/http.exception.js";

export class StudentServices {

    /*-------------------- register student --------------------*/

    static async register(body) {
        const { name, studentID, batch, password } = body;

        const student = await StudentModel.findOne({ studentID });
        if (student) {
            throw BadRequestException("Student ID already exists")
        };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newStudent = new StudentModel({
            name,
            studentID,
            batch,
            password: hashedPassword,
        });

        await newStudent.save();

        return {
            token: issueJWT({
                id: newStudent._id,
                studentID: newStudent.studentID,
                name: newStudent.name,
                batch: newStudent.batch,
                isPaid: newStudent.isPaid,
            }),
        }
    }


    /*-------------------- login student --------------------*/

    static async login(body) {
        const { studentID, password } = body;

        const student = await StudentModel.findOne({ studentID });
        if (!student) {
            throw NotFoundException("Student not found")
        };

        const validPassword = await bcrypt.compare(password, student.password);
        if (!validPassword) {
            throw BadRequestException("Invalid ID or password")
        };

        return {
            token: issueJWT({
                id: student._id,
                studentID: student.studentID,
                name: student.name,
                batch: student.batch,
                isPaid: student.isPaid,
            }),
        }
    }


    /*-------------------- get student details --------------------*/

    static async getDetails(id) {
        const student = await StudentModel.findById(id, { password: 0 });
        if (!student) {
            throw NotFoundException("Student not found")
        };

        return student;
    }


    /*-------------------- update student details --------------------*/

    static async updateDetails(id, body) {
        const { name, batch } = body;

        const student = await StudentModel.findById(id, { password: 0 });
        if (!student) {
            throw NotFoundException("Student not found")
        };

        student.name = name || student.name;
        student.batch = batch || student.batch;

        await student.save();

        return student;
    }
}