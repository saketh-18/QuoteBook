//connect to mongodb 
// response the quotes

import connectToDb from "@/database";
import Quote from "@/models";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDb();

        const quoteList = await Quote.find({});

        if(quoteList){
            return NextResponse.json(  {
                success: "true" ,
                data : quoteList
            })
        } 
        else{
            return NextResponse.json({
                success: "false" ,
                message : "unable to fetch list of quotes"
            })
        }
    }
    catch(e) {
        return NextResponse.json({
            success :"false" ,
            message : e.message
        })
    }

}