const router = require('express').Router();

const { getAllCustomer, getAllOrder, getAllEmployee, getAllInventory, getAllTailor, customerfind, employeefind, inventoryfind, Adminlogin, orderfind, customersByTailor, employeeByTailor, inventoryByTailor, orderByTailor, adminorders } = require('../controller/admin');
const { verifyToken } = require('../middleware/auth');

router.post('/login', Adminlogin);
router.get('/allCustomer',verifyToken, getAllCustomer);
router.get('/allorder',verifyToken, getAllOrder);
router.get('/allemployee',verifyToken, getAllEmployee); 
router.get('/allinventory',verifyToken,getAllInventory);
router.get('/alltailor',verifyToken, getAllTailor);
router.get('/customerfind',verifyToken, customerfind);
router.get('/employeefind',verifyToken, employeefind);
router.get('/inventoryfind',verifyToken,inventoryfind);
router.get('/orderfind',verifyToken, orderfind);
router.get('/tailor/:id/customers',verifyToken, customersByTailor);
router.get('/tailor/:id/employee',verifyToken, employeeByTailor);
router.get('/tailor/:id/inventory',verifyToken, inventoryByTailor);
router.get('/tailor/:id/order',verifyToken, orderByTailor);
router.get('/order/customer', adminorders);


// router.post('/login', Adminlogin);
// router.get('/allCustomer', getAllCustomer);
// router.get('/allorder', getAllOrder);
// router.get('/allemployee', getAllEmployee); 
// router.get('/allinventory',getAllInventory);
// router.get('/alltailor', getAllTailor);
// router.get('/customerfind', customerfind);
// router.get('/employeefind', employeefind);
// router.get('/inventoryfind',inventoryfind);
// router.get('/orderfind', orderfind);
// router.get('/tailor/:id/customers', customersByTailor);
// router.get('/tailor/:id/employeees', employeeByTailor);
// router.get('/tailor/:id/inventory', inventoryByTailor);
// router.get('/tailor/:id/order', orderByTailor);

module.exports = router;
