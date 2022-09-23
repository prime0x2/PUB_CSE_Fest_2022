import bcrypt from 'bcrypt';
import { issueJWT } from "../config/issueJWT.js";
import { AdminModel } from "../schemas/admin.schema.js";
import { StudentModel } from "../schemas/student.schema.js";
import { BadRequestException, NotFoundException } from "../utilities/http.exception.js";


export class AdminServices {

    /*-------------------- register admin --------------------*/

    static async register(body) {
        const { name, username, password } = body;

        const admin = await AdminModel.findOne({ username });
        if (admin) {
            throw BadRequestException("Username already exists")
        };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new AdminModel({
            name,
            username,
            password: hashedPassword,
        });

        await newAdmin.save();

        return {
            token: issueJWT({
                id: newAdmin._id,
                username: newAdmin.username,
                name: newAdmin.name,
            }),
        }
    }


    /*-------------------- login admin --------------------*/

    static async login(body) {
        const { username, password } = body;

        const admin = await AdminModel.findOne({ username });
        if (!admin) {
            throw NotFoundException("Admin not found")
        };

        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
            throw BadRequestException("Invalid username or password")
        };

        return {
            token: issueJWT({
                id: admin._id,
                username: admin.username,
                name: admin.name,
            }),
        }
    }


    /*-------------------- get all admins --------------------*/

    static async getAdminsList(isAdmin) {
        if (!isAdmin) throw BadRequestException("You are not an admin");

        const admins = await AdminModel.find({}, { password: 0 });

        return admins;
    }


    /*-------------------- get students list --------------------*/

    static async getStudentsList(isAdmin) {
        if (!isAdmin) throw BadRequestException("You are not an admin");

        const students = await StudentModel.find({}, { password: 0 });

        return students;
    }


    /*-------------------- get student details --------------------*/

    static async getStudentDetails(isAdmin, id) {
        if (!isAdmin) throw BadRequestException("You are not an admin");

        const student = await StudentModel.findById(id, { password: 0 });
        if (!student) {
            throw NotFoundException("Student not found")
        };

        return student;
    }


    /*-------------------- delete student --------------------*/

    static async deleteStudent(isAdmin, id) {
        if (!isAdmin) throw BadRequestException("You are not an admin");

        const student = await StudentModel.findById(id);
        if (!student) {
            throw NotFoundException("Student not found")
        };

        await student.delete();

        return "Student deleted successfully";
    }


    /*-------------------- approve payment --------------------*/

    static async approvePayment(isAdmin, id) {
        if (!isAdmin) throw BadRequestException("You are not an admin");

        const student = await StudentModel.findById(id);
        if (!student) {
            throw NotFoundException("Student not found")
        };

        if (student.fest2022.payment.status === "approved") {
            throw BadRequestException("Payment already approved")
        };

        if (student.fest2022.payment.status === "rejected") {
            throw BadRequestException("Payment already rejected")
        }

        if (!student.fest2022.payment.trxID) {
            throw NotFoundException("Transaction ID not found")
        }

        student.fest2022.payment.status = "approved";
        student.fest2022.payment.date = new Date();

        await student.save();

        return {
            paymentStatus: student.fest2022.payment.status,
        }
    }


    /*-------------------- reject payment --------------------*/

    static async rejectPayment(isAdmin, id) {
        if (!isAdmin) throw BadRequestException("You are not an admin");

        const student = await StudentModel.findById(id);
        if (!student) {
            throw NotFoundException("Student not found")
        };

        if (student.fest2022.payment.status === "approved") {
            throw BadRequestException("Payment already approved")
        };

        if (student.fest2022.payment.status === "rejected") {
            throw BadRequestException("Payment already rejected")
        }

        if (!student.fest2022.payment.trxID) {
            throw NotFoundException("Transaction ID not found")
        }

        student.fest2022.payment.status = "rejected";

        await student.save();

        return {
            paymentStatus: student.fest2022.payment.status,
        }
    }


    /*-------------------- toggle t-shirt status --------------------*/

    static async tShirtStatus(isAdmin, id) {
        if (!isAdmin) throw BadRequestException("You are not an admin");

        const student = await StudentModel.findById(id);
        if (!student) {
            throw NotFoundException("Student not found")
        };

        student.fest2022.info.receivedTShirt = !student.fest2022.info.receivedTShirt;

        await student.save();

        return {
            tShirtStatus: student.fest2022.info.receivedTShirt,
        }
    }


    /*-------------------- toggle food status --------------------*/

    static async foodStatus(isAdmin, id) {
        if (!isAdmin) throw BadRequestException("You are not an admin");

        const student = await StudentModel.findById(id);
        if (!student) {
            throw NotFoundException("Student not found")
        };

        student.fest2022.info.receivedFood = !student.fest2022.info.receivedFood;

        await student.save();

        return {
            foodStatus: student.fest2022.info.receivedFood,
        }
    }


    /*-------------------- toggle attending status --------------------*/

    static async attendingStatus(isAdmin, id) {
        if (!isAdmin) throw BadRequestException("You are not an admin");

        const student = await StudentModel.findById(id);
        if (!student) {
            throw NotFoundException("Student not found")
        };

        student.fest2022.info.isAttending = !student.fest2022.info.isAttending;

        await student.save();

        return {
            attendingStatus: student.fest2022.info.isAttending,
        }
    }
}