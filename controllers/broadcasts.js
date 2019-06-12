const { Broadcast } = require('../db/models');


module.exports = {
  get(req, res) {
    (async () => {
      try {
        const broadcasts = await Broadcast.findAll();
        if (broadcasts.length === 0) {
          return res.json({ has_broadcast: false });
        } else if (broadcasts.length > 1) {
          return res.status(500).json({ message: 'Should not have more than one broadcast' });
        }
        
        return res.json({
          has_broadcast: true,
          summary: broadcasts[0].summary,
          message: broadcasts[0].message,
        });
      } catch (e) {
        return res.status(500).send(e);
      }
    })();
  },
};
