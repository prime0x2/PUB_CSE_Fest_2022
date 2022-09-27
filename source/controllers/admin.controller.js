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
            const data = await AdminServices.getAdminsList(req.isAdmin);

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
            const data = await AdminServices.getStudentsList(req.isAdmin);

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
            const data = await AdminServices.getStudentDetails(req.isAdmin, req.params.id);

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
            const data = await AdminServices.deleteStudent(req.isAdmin, req.params.id);

            res.status(200).json({
                status: 200,
                message: "Student deleted successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    }


    /*-------------------- pending payments --------------------*/

    static async pendingPayments(req, res, next) {
        try {
            const data = await AdminServices.pendingPayments(req.isAdmin);

            res.status(200).json({
                status: 200,
                message: "Pending payments fetched successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    }


    /*-------------------- approve payment --------------------*/

    static async approvePayment(req, res, next) {
        try {
            const data = await AdminServices.approvePayment(req.isAdmin, req.params.id);

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
            const data = await AdminServices.rejectPayment(req.isAdmin, req.params.id);

            res.status(200).json({
                status: 200,
                message: "Payment rejected successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    }


    /*-------------------- tShirt status --------------------*/

    static async tShirtStatus(req, res, next) {
        try {
            const data = await AdminServices.tShirtStatus(req.isAdmin, req.params.id);

            res.status(200).json({
                status: 200,
                message: "T-Shirt status updated successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    }


    /*-------------------- attendance status --------------------*/

    static async attendanceStatus(req, res, next) {
        try {
            const data = await AdminServices.attendanceStatus(req.isAdmin, req.params.id, req.body);

            res.status(200).json({
                status: 200,
                message: "Attendance status updated successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    }


    /*-------------------- food status --------------------*/

    static async foodStatus(req, res, next) {
        try {
            const data = await AdminServices.foodStatus(req.isAdmin, req.params.id, req.body);

            res.status(200).json({
                status: 200,
                message: "Food status updated successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    }
}