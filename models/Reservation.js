class Reservation {


    constructor(client, hotel, chambre,  dateDebut, dateFin) {
        this.chambre = chambre;
        this.client = client;
        this.hotel = hotel;
        this.tarif = new Tarif(chambre, dateDebut, dateFin);
    }

    toString() {
        return `<div>
        Réservation:<br/>
        ${this.client.toString()}
        ${this.hotel.toString()}
        ${this.chambre.toString()}
        </div>
        `;
    }
}

module.exports = Reservation;