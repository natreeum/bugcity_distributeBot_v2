const getMemsByCId = require('../../functions/prismaScripts/getMemsByCId');

module.exports = {
  getmember: async (req, res) => {
    const bName = req.params.business;
    const mems = await getMemsByCId(bName);
    if (mems.length === 0)
      return res.send({ status: 'fail', message: 'No matching business' });
    else return res.send({ status: 'success', message: mems });
  },
};
