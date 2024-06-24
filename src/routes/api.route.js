const express = require("express");
const {
    crateUser,
    getUsers,
    delUsers,
    updateUser,
    retireUser,
} = require("../controllers/api.controller");

const router = express.Router();

router.post("/User", crateUser);

router.get("/User", getUsers);

router.delete("/User", delUsers);

router.put("/User", updateUser);

router.patch("/User", retireUser);

router.get("/test", (req, res) => {
    res.send({ status: "OK" });
});

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */

/**
 * @swagger
 * /User:
 *   post:
 *     summary: Create a user
 *     description: Only admins can create other users.
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: user
 *         required: true
 *         schema:
 *           type: string
 *           example: Saadullah
 *         description: New user ID
 *       - in: query
 *         name: age
 *         required: true
 *         schema:
 *           type: number
 *           example: 20
 *         description: Age of the new user
 
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 user:
 *                   type: string
 *                   description: Name of the user (Same as input)
 *                   example: Saadullah
 *
 *       "417":
 *         description: Failed to create a user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Failed"
 *                 user:
 *                   type: string
 *                   description: Name of the user (Same as input)
 *                   example: Saadullah
 * 
 *   get:
 *     summary: Get specific or all users
 *     description: Only admins can retrieve all users.
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *           example: Saad
 *         description: User name to search for
 *       - in: query
 *         name: age
 *         schema:
 *           type: integer
 *           example: 24
 *         description: User's age to search for
 *     responses:
 *       "200":
 *         description: List of users retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 users:
 *                   type: array
 *                   description: List of the users
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       "417":
 *         description: Failed to retrieve list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Failed"
 *   delete:
 *     summary: Delete some specific user
 *     description: Only admins can delete some user.
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *           example: SaadPk
 *         description: User ID of the user to be deleted
 *     responses:
 *       "200":
 *         description: Specified user got deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 user:
 *                   type: string
 *                   description: Name of the user (Same as input)
 *                   example: SaadPk
 *       "417":
 *         description: Failed to delete specific user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Failed"
 *                 user:
 *                   type: string
 *                   description: Name of the user (Same as input)
 *                   example: SaadPk
 *   patch:
 *     summary: Declare some specific user retired
 *     description: Sets the age to 60
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *           example: SaadPk
 *         description: User ID of the user to be retired
 *     responses:
 *       "200":
 *         description: Specified user got retired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 user:
 *                   type: string
 *                   description: Name of the user (Same as input)
 *                   example: SaadPk
 *                 age:
 *                   type: integer
 *                   description: Age of the user (updated)
 *                   example: 60
 *       "417":
 *         description: Failed to retire specific user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Failed"
 *                 user:
 *                   type: string
 *                   description: Name of the user (Same as input)
 *                   example: SaadPk
 *   put:
 *     summary: Update details of some specific user
 *     description: Sets the new age of some user
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *           example: SaadPk
 *         description: User ID of the user to be retired
 *       - in: query
 *         name: age
 *         schema:
 *           type: integer
 *           example: 20
 *         description: New age of the user
 *     responses:
 *       "200":
 *         description: Specified user got updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 user:
 *                   type: string
 *                   description: Name of the user (Same as input)
 *                   example: SaadPk
 *                 age:
 *                   type: integer
 *                   description: Age of the user (Same as input)
 *                   example: 60
 *       "417":
 *         description: Failed to update specific user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Failed"
 *                 user:
 *                   type: string
 *                   description: Name of the user (Same as input)
 *                   example: SaadPk
 *                 age:
 *                   type: integer
 *                   description: Age of the user (Same as input)
 *                   example: 20
 */
