const express = require('express');

const router = express.Router();
const servicesManager = require('../models/servicesManager.model');

/**
 *  Quick storage accesses to the handle service path
 *  Structure: { Store ID : Service Handler }
 */
const storeServiceHandlerList = {};

function serviceHandler(storeId) {
  let handleService = storeServiceHandlerList[storeId];

  if (!handleService) {
    const { currentServiceHandler } = servicesManager;
    // Insert the new store id to the quicks storage
    storeServiceHandlerList[storeId] = currentServiceHandler;
    // Reassign to the current service handler
    handleService = currentServiceHandler;
    // Set the next service handler
    servicesManager.nextServiceHandler();
  }
  // Where the execution to the service will occur
  return `StoreID: ${storeId} , Service Name ${handleService.name}`;
}

const asyncRoute = route => (req, res, next) => {
  Promise.resolve(route(req, res)).catch(next);
};

// Path param router
router.get(
  '/api/v1/storeId/:id',
  asyncRoute(async (req, res, next) => {
    const { id } = req.params;
    if (id) {
      const resMsg = await serviceHandler(id);
      res.send({ msg: resMsg });
    }
  })
);

// Query param router
router.get('/api/v1/campaigns', (req, res, next) => {
  const { storeId } = req.query;
  if (storeId) {
    const resMsg = serviceHandler(storeId);
    res.send({ msg: resMsg });
  }
});

// Http header router
router.get(
  '/api/v1/settings',
  asyncRoute(async (req, res, next) => {
    const { storeid } = req.headers;
    if (storeid) {
      const resMsg = await serviceHandler(storeid);
      res.send({ msg: resMsg });
    }
  })
);

module.exports = router;
