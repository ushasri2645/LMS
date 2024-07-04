import { Members } from "../Models/MembersModel";

class MembersService{
    static getAllMembers = async() => {
        try{
            const members = await Members.findAll();
            console.table(members.map((member)=>member.toJSON()));
        }
        catch(error){
            console.log("Error Fetching data:",error);
        }
    }

    static getMemberById = async(memberId: number) => {
        try{
            const member = await Members.findByPk(memberId);
            if(member){
                console.table(member.toJSON());
            }
            else{
                console.log("Member not Found");
            }
        }
        catch(error){
            console.log("Error fetching Member:",error);
        }
    }

    static updateMember = async(memberId: number,updatedData: object) =>{ 
        try{
            const member=await Members.findByPk(memberId);
            if(member){
                await member.update(updatedData);
            }
            else{
                console.log("Member not Found");
            }
        }
        catch(error){
            console.log("Error fetching Member:",error);
        }
    }

    static deleteMember = async(memberId: number) => {
        try{
            const member=await Members.findByPk(memberId);
            if(member){
                await member.destroy();
            }
            else{
                console.log("Member not Found");
            }
        }
        catch(error){
            console.log("Error fetching Member:",error);
        }
    }
}

export {MembersService}