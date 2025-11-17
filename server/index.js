const express = require('express');
const app = express();
app.use(express.json());

const PORT = 8605

app.get('/api', (req, res) => {
    res.json({ msg: 'Branchtalk API Running.' });
});

const rootsRoutes = require('./routes/roots');
app.use('/api/root', rootsRoutes);

const nodesRoutes = require('./routes/nodes');
app.use('/api/node', nodesRoutes);

const indexRoutes = require('./routes/index');
app.use('/api/index', indexRoutes);

app.listen(PORT, () => { console.log(`Branchtalk running on port ${PORT}`) });
