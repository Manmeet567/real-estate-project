const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const {addProperty, pendingReview, approvedProperties, userProperties, approveProperty, deleteProperty} = require('../controllers/propertyControllers');

const router = express.Router();

// auth middleware
router.use(requireAuth);

router.post('/add-property', addProperty)

router.get('/pending-review', pendingReview)

router.get('/approved-properties', approvedProperties)

router.get('/user-properties', userProperties)

router.post('/approve-property', approveProperty)

router.delete('/delete-property', deleteProperty)

module.exports = router;