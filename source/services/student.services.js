import bcrypt from 'bcrypt';
import { issueJWT } from '../config/issueJWT.js';
import { StudentModel } from "../schemas/student.schema.js";
import { BadRequestException, NotFoundException } from "../utilities/http.exception.js";

export class StudentServices {

    /*-------------------- register student --------------------*/

    static async register(body) {
        const { name, studentID, phone, password, tShirtSize } = body;

        const student = await StudentModel.findOne({ studentID });
        if (student) {
            throw BadRequestException("Student ID already exists")
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newStudent = new StudentModel({
            name,
            studentID,
            phone,
            password: hashedPassword,
            fest2022: {
                tShirtSize,
            }
        });

        await newStudent.save();

        return {
            token: issueJWT({
                id: newStudent._id,
                studentID: newStudent.studentID,
                name: newStudent.name,
            })
        }
    }


    /*-------------------- login student --------------------*/

    static async login(body) {
        const { studentID, password } = body;

        const student = await StudentModel.findOne({ studentID });
        if (!student) {
            throw NotFoundException("Student not found")
        }

        const validPassword = await bcrypt.compare(password, student.password);
        if (!validPassword) {
            throw BadRequestException("Invalid student ID or password")
        }

        return {
            token: issueJWT({
                id: student._id,
                studentID: student.studentID,
                name: student.name,
            })
        }
    }


    /*-------------------- my profile --------------------*/

    static async myProfile(id) {
        const student = await StudentModel.findById(id, { password: 0 });
        if (!student) {
            throw NotFoundException("Student not found")
        }

        return student;
    }


    /*-------------------- update profile --------------------*/

    static async updateProfile(id, body) {
        const { name, phone, tShirtSize } = body;

        const student = await StudentModel.findById(id, { password: 0 });
        if (!student) {
            throw NotFoundException("Student not found")
        }

        student.name = name || student.name;
        student.phone = phone || student.phone;
        student.fest2022.tShirtSize = tShirtSize || student.fest2022.tShirtSize;

        await student.save();

        return {
            name: student.name,
            phone: student.phone,
            tShirtSize: student.fest2022.tShirtSize,
        }
    }


    /*-------------------- payment --------------------*/

    static async payment(id, body) {
        const { transactionID } = body;

        const student = await StudentModel.findById(id, { password: 0 });
        if (!student) {
            throw NotFoundException("Student not found")
        }

        student.fest2022.payment.trxID = transactionID;

        await student.save();

        return {
            transactionID: student.fest2022.payment.trxID,
        }
    }
}