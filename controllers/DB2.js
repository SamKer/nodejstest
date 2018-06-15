'use strict';
const mongoose = require('mongoose');
class DB2  {
    constructor(url, port, db) {
        this.url = url;
        this.dbname = db;
        this.port = port;
        this.createSchema();
        mongoose.connect(`mongodb://${url}:${port}/${db}`);
        this.connection = mongoose.connection;
    }

    createSchema() {
        let {Hotel,Chambre,Tarif,Client} = require('../models/schema');
        var t = new mongoose.Schema(Hotel);
        var l = mongoose.model('hotel', t);
        this.Hotel = new l();
        var t = new mongoose.Schema(Chambre);
        var l = mongoose.model('chambre', t);
        this.Chambre = new l();
        var t = new mongoose.Schema(Tarif);
        var l = mongoose.model('tarif', t);
        this.Tarif = new l();
        var t = new mongoose.Schema(Client);
        var l = mongoose.model('client', t);
        this.Client = new l();

        //
        // new mongoose.model('hotel', new Schema(Hotel))().save();
        // new mongoose.model('chambre', new Schema(Chambre))().save();
        // new mongoose.model('tarif', new Schema(Tarif))().save();
        // new mongoose.model('client', new Schema(Client))().save();

    }

    populate() {
        this.Hotel.nom = 'Palace';
        this.Hotel.address = 'ici ou là';
        this.Hotel.cp = 12345;
        this.Hotel.ville = 'Perdu les bains';
        this.Hotel.save();
            this.Chambre.numero = 1;
            this.Chambre.surface = 14;
            this.Chambre.capacite = 3;
            this.Chambre.nombreLits = 2;
            this.Chambre.tarif = 55;
            this.Chambre.save();
              this.Client.nom = 'jean';
            this.Client.prenom = 'aymard';
            return this.Client.save();

    }


    render(req, res, next, list) {
        // this.connection.close();
        res.render('db', {
            title:'data List',
            db: this.dbname,
            collection: 'test',
            list: list
        });
    }
}
module.exports = DB2;