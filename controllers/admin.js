const { Broadcast } = require('../db/models');

module.exports = {
  get(req, res) {
    (async () => {
      try {
        const broadcasts = await Broadcast.findAll();
        if (broadcasts.length === 0) {
          return res.render('admin/index.html', {
            has_broadcast: false,
            summary: '',
            message: '',
          });
        } else if (broadcasts.length > 1) {
          return res.status(500).json({ message: 'Should not have more than one broadcast' });
        }

        return res.render('admin/index.html', {
          has_broadcast: true,
          summary: broadcasts[0].summary,
          message: broadcasts[0].message,
        });
      } catch (e) {
        return res.status(500).send(e);
      }
    })();
  },

  post(req, res) {
    (async () => {
      try {
        await Broadcast.destroy({
          where: {},
          truncate: true,
        });

        await Broadcast.create({
          summary: req.body.summary,
          message: req.body.message,
        });

        return res.render('admin/index.html', {
          has_broadcast: true,
          summary: req.body.summary,
          message: req.body.message,
        });
      } catch (error) {
        return res.status(500).send(error);
      }
    })();
  },

  delete(req, res) {
    (async () => {
      try {
        await Broadcast.destroy({
          where: {},
          truncate: true,
        });

        return res.redirect('/admin');
      } catch (e) {
        return res.status(500).send(e);
      }
    })();
  },
};
