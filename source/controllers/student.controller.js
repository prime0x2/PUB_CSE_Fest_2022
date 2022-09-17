import { StudentServices } from "../services/student.services.js";

export class StudentController {

    /*-------------------- register student --------------------*/

    static async register(req, res, next) {
        try {
            const data = await StudentServices.register(req.body);

            res.status(201).json({
                status: 200,
                message: "Student registered successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    }


    /*-------------------- login student --------------------*/

    static async login(req, res, next) {
        try {
            const data = await StudentServices.login(req.body);

            res.status(200).json({
                status: 200,
                message: "Student logged in successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    }


    /*-------------------- get student details --------------------*/

    static async getDetails(req, res, next) {
        try {
            const data = await StudentServices.getDetails(req.userID);

            res.status(200).json({
                status: 200,
                message: "Student details fetched successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    }


    /*-------------------- update student details --------------------*/

    static async updateDetails(req, res, next) {
        try {
            const data = await StudentServices.updateDetails(req.userID, req.body);

            res.status(200).json({
                status: 200,
                message: "Student details updated successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    }
}