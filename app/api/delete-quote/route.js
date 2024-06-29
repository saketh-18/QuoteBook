import connectToDb from "@/database";
import Quote from "@/models";
import { NextResponse } from "next/server";


export async function POST(req){ 
    try{ 
        await connectToDb();

        const deleteID = await req.json();
        const {id} = deleteID;

        if(!id){
            return NextResponse.json({
                success: false,
                message : "id is required to delete the quote",
            })
        }

        const deleteQuote = await Quote.findByIdAndDelete(id);

        if(deleteQuote){
            console.log("deleteddd!!")
            return NextResponse.json({
                success: true ,
                message: "succesfully deleted the quote"
            })
        }
        else {
            return NextResponse.json({
                success :false ,
                message : "unable to delete the quote"
            })
        }

    }catch(e){
        return NextResponse.json({
            success : false ,
            message : e.message
        })
    }
}