const captainController = require('../controllers/captain.controller');
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authMiddleware = require("../middlewares/auth.middleware"); 

// router creation for the register captain
router.post('/register', [
  body('email').isEmail().withMessage('Invalid email'),

  body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),

  body('fullname.lastname').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),

  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'), 

  body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),

  body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),

  body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'),

  body('vehicle.vehicleType').isIn(['car', 'bike', 'bicycle']).withMessage('Vehicle type must be either car, bike or bicycle'),


], captainController.registerCaptain);


// router creation for the login captain

router.post('/login', [
  body('email').isEmail().withMessage('Invalid email'),

  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

], captainController.loginCaptain);

// router creation for the captain profile

router.get('/profile',authMiddleware.authCaptain, captainController.getCaptainProfile)


// router creation for the logout of the captain
router.get('/logout',authMiddleware.authCaptain, captainController.logoutCaptain) 

module.exports = router;