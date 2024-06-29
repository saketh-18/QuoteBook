import connectToDb from "@/database";
import Quote from "@/models";
import Joi from "joi";
import { NextResponse } from "next/server";

const EditedBlog = Joi.object({
    quote : Joi.string().required(),
    author : Joi.string().required()
})


export async function PUT(req) {
    try{
        await connectToDb();

        const EditedQuote = await req.json();
        console.log(EditedQuote);
        const { _id , quote , author} = EditedQuote;

        if(!_id){
            console.log("id is required to edit the quote");
            return NextResponse.json({
                success: false,
                message : "id is required to edit the quote",
            })
        }

        const {error} = EditedBlog.validate({
            quote , author
        });

        if(error){
            console.log(error.message);
            return NextResponse.json({
                success:false ,
                message :error.message
            })
        }


        const editQuote = await Quote.findByIdAndUpdate(
            _id ,
            {quote , author} ,
            {new : true}
        )

        if(editQuote){
            console.log("succesfully edited the quote");
            return NextResponse.json({
                success:true ,
                message :"succesfully edited the quote" ,
                data : editQuote
            })
        }
        else {
            console.log("quote not found with id : " , _id);
            return NextResponse.json({
                success:false ,
                message : "there is no quote exist for the id"
            })
        }
    }
    catch(e){
        console.log(e)
        return NextResponse.json({
            success: false ,
            message : 'something went wrong please try again later.'
        })
    }
}