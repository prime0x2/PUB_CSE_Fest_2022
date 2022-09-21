import { AdminServices } from "../services/admin.services.js";

export class AdminController {

    /*-------------------- register admin --------------------*/

    static async register(req, res, next) {
        try {
            const data = await AdminServices.register(req.body);

            res.status(201).json({
                status: 200,
                message: "Admin registered successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    }


    /*-------------------- login admin --------------------*/

    static async login(req, res, next) {
        try {
            const data = await AdminServices.login(req.body);

            res.status(200).json({
                status: 200,
                message: "Admin logged in successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    }


    /*-------------------- get all admins --------------------*/

    static async getAllAdmins(req, res, next) {
        try {
            const data = await AdminServices.getAdminsList();

            res.status(200).json({
                status: 200,
                message: "All admins fetched successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    }


    /*-------------------- get students list --------------------*/

    static async getStudentsList(req, res, next) {
        try {
            const data = await AdminServices.getStudentsList();

            res.status(200).json({
                status: 200,
                message: "Students list fetched successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    }


    /*-------------------- get student details --------------------*/

    static async getStudentDetails(req, res, next) {
        try {
            const data = await AdminServices.getStudentDetails(req.params.id);

            res.status(200).json({
                status: 200,
                message: "Student details fetched successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    }


    /*-------------------- delete student --------------------*/

    static async deleteStudent(req, res, next) {
        try {
            const data = await AdminServices.deleteStudent(req.params.id);

            res.status(200).json({
                status: 200,
                message: "Student deleted successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    }


    /*-------------------- approve payment --------------------*/

    static async approvePayment(req, res, next) {
        try {
            const data = await AdminServices.approvePayment(req.params.id);

            res.status(200).json({
                status: 200,
                message: "Payment approved successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    }


    /*-------------------- reject payment --------------------*/

    static async rejectPayment(req, res, next) {
        try {
            const data = await AdminServices.rejectPayment(req.params.id);

            res.status(200).json({
                status: 200,
                message: "Payment rejected successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    }


    /*-------------------- toggle t-shirt status --------------------*/

    static async tShirtStatus(req, res, next) {
        try {
            const data = await AdminServices.tShirtStatus(req.params.id);

            res.status(200).json({
                status: 200,
                message: "T-shirt status toggled successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    }


    /*-------------------- toggle food status --------------------*/

    static async foodStatus(req, res, next) {
        try {
            const data = await AdminServices.foodStatus(req.params.id);

            res.status(200).json({
                status: 200,
                message: "Food status toggled successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    }


    /*-------------------- toggle attending status --------------------*/

    static async attendingStatus(req, res, next) {
        try {
            const data = await AdminServices.attendingStatus(req.params.id);

            res.status(200).json({
                status: 200,
                message: "Attending status toggled successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    }
}