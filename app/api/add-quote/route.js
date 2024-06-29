import connectToDb from "@/database";
import Quote from "@/models";
import Joi from "joi";
import { NextResponse } from "next/server";

const addNewBlog = Joi.object({
    quote : Joi.string().required(),
    author : Joi.string().required()
})

export async function POST(req) {
    try { 
        await connectToDb();

        const QuoteData = await req.json();
        const {quote , author} = QuoteData;

        const {error} = addNewBlog.validate({
            quote , author
        });

        if(error){
            return NextResponse.json({
                success : false ,
                message : error.details[0].message ,
            });
        }

        const NewQuote = await Quote.create(QuoteData);
        if(NewQuote) {
            return  NextResponse.json({
                success: true ,
                message: "succesfully added a quote to database" ,
            })
        }
        else {
            return NextResponse.json({
                success : true ,
                message : "succesfully added a quote" ,
            });
        }
        
        
    }
    catch(e) {
        console.log(e);
        return NextResponse.json({
            success : false ,
            message : error.details[0].message ,
        })
    }
}