const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Imagine Dragon'));
bands.addBand(new Band('Avicii'));
bands.addBand(new Band('ColdPlay'));
bands.addBand(new Band('The Chainsmokers'));
bands.addBand(new Band('Metallica'))

//Sockets Messages
io.on('connection', client => {
    console.log('Cliente Conectado')

    client.emit('active-bands', bands.getBands());
    

    client.on('disconnect', () => {console.log('Cliente Desconectado')});

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        const newBand = new Band (payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
    
});