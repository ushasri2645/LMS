import { Reservation } from "../Models/ReservationModel";

class ReservationService{
    static getAllReservations = async() => {
        try{
            const reservations = await Reservation.findAll();
            console.table(reservations.map((reservation)=>reservation.toJSON()));
        }
        catch(error){
            console.log("Error Fetching data:",error);
        }
    }

    static getReservationById = async(reservationId: number) => {
        try{
            const reservation = await Reservation.findByPk(reservationId);
            if(reservation){
                console.table(reservation.toJSON());
            }
            else{
                console.log("Reservation not Found");
            }
        }
        catch(error){
            console.log("Error fetching Reservation:",error);
        }
    }

    static updateReservation = async(reservationId: number,updatedData: object) =>{ 
        try{
            const reservation=await Reservation.findByPk(reservationId);
            if(reservation){
                await reservation.update(updatedData);
            }
            else{
                console.log("Reservation not Found");
            }
        }
        catch(error){
            console.log("Error fetching Reservation:",error);
        }
    }

    static deleteReservation = async(reservationId: number) => {
        try{
            const reservation=await Reservation.findByPk(reservationId);
            if(reservation){
                await reservation.destroy();
            }
            else{
                console.log("reservation not Found");
            }
        }
        catch(error){
            console.log("Error fetching reservation:",error);
        }
    }
}

export {ReservationService}