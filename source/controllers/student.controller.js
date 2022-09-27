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
                message: "Logged in successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    }


    /*-------------------- get my profile --------------------*/

    static async getMyProfile(req, res, next) {
        try {
            const data = await StudentServices.myProfile(req.userID);

            res.status(200).json({
                status: 200,
                message: "My profile details fetched successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    }


    /*------------------------- payment -------------------------*/

    static async payment(req, res, next) {
        try {
            const data = await StudentServices.payment(req.userID, req.body);

            res.status(200).json({
                status: 200,
                message: "Payment submitted successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    }


    /*-------------------- tShirt size --------------------*/

    static async tShirtSize(req, res, next) {
        try {
            const data = await StudentServices.tShirtSize(req.userID, req.body);

            res.status(200).json({
                status: 200,
                message: "T-shirt size submitted successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    }


    /*-------------------- participation --------------------*/

    static async participation(req, res, next) {
        try {
            const data = await StudentServices.participation(req.userID, req.body);

            res.status(200).json({
                status: 200,
                message: "Participation submitted successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    }


    /*-------------------- update info --------------------*/

    static async updateProfile(req, res, next) {
        try {
            const data = await StudentServices.updateProfile(req.userID, req.body);

            res.status(200).json({
                status: 200,
                message: "Profile info updated successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    }
}