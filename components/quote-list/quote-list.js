"use client"
import React, { useEffect, useState } from 'react';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter ,
} from "@/components/ui/card";
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose ,
  } from "@/components/ui/dialog"
import { Input } from "@nextui-org/input";

export default function QuoteList() {
    const [quotes, setQuotes] = useState([]);
    const [loading  , setLoading] = useState(true);
    const [isOpen , setIsOpen] = useState(false);
    const [editQuote , setEditQuote] = useState({quote : "" , author : ""});
    const [editQuoteContent , setEditQuoteContent] = useState("");
    const [editQuoteAuthor , setEditQuoteAuthor] = useState("");

    function handleEditButton(Quote){
       setIsOpen(true);
       setEditQuote(Quote);
       setEditQuoteContent(Quote.quote);
       setEditQuoteAuthor(Quote.author);
       
    }

    async function handleEdit(){
        const QuoteToBeEdited = {_id : editQuote._id , quote : editQuoteContent , author : editQuoteAuthor}
        console.log(QuoteToBeEdited)
        const response = await fetch("/api/edit-quote" , {
            method : "PUT" ,
            headers : {
                "content-type" : "application/json"
            } ,
            body : JSON.stringify(QuoteToBeEdited)
        });

        if(response.ok){
            console.log("succesfully edited the quote");
            
            setIsOpen(false);
        }
        else {
            console.log('unable to delete the quote');
        }
    }
    
    async function handleDelete(id){
        
       const response =  await fetch("/api/delete-quote" , {
            method: "POST" ,
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({id})
        });

        if(response.ok){
            console.log("succesfully deleted the quote");
            setQuotes(quotes.filter(quote => quote._id !== id));
        }
        else {
            console.log("unable to delete the quote");
        }

    }
    

    useEffect(() => {
        async function fetchQuotes() {
            try{
            const response = await fetch("/api/get-quote");
            const data = await response.json();
            setQuotes(data.data); 
            setLoading(false); 
        } catch(e){
            console.error("Failed to fetch quotes:", error);
            setLoading(false); 
        }
        }
        
       
        fetchQuotes();
 
    }, []);

    if(loading){
        return <div className='text-white flex justify-center items-center text-2xl font-bold'>
            Quotes are loading.........
        </div>
    }

    return (
        <div className='flex flex-col'>
        <div className='w-full items-center flex justify-center flex-wrap'>
            {quotes.map((quote) => (
                <Card key={quote._id} className="bg-white  gap-2 m-4">
                    <CardHeader>
                        <CardTitle>{quote.quote}</CardTitle>
                        <CardDescription>{quote.author}</CardDescription>
                    </CardHeader>
                    <CardFooter className="gap-2 flex ">
                    <Button className="bg-black rounded-lg text-white hover:bg-white hover:text-black hover:outline" onClick={() => handleEditButton(quote)}>Edit</Button>
                    <Button className="bg-black rounded-lg text-white hover:bg-white hover:text-black hover:outline" onClick={() => handleDelete(quote._id)}>Delete</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
            <Dialog asChild className="bg-white" open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent className="bg-white" aria-describedby={undefined}>
                        <DialogHeader>
                        <DialogTitle>Edit Quote</DialogTitle>
                            <Input className="border-2" name="quote" placeholder="type the quote" value={editQuoteContent} onChange={(e) => {setEditQuoteContent(e.target.value)}}/>
                            <Input className="border-2" name="author" placeholder="enter the name of author" value={editQuoteAuthor} onChange={(e) => {setEditQuoteAuthor(e.target.value)}}/>
                        </DialogHeader>
                        <DialogClose asChild>
                            <Button className="bg-black text-xl text-white" onClick={handleEdit}>Save Changes</Button>
                        </DialogClose>
                    </DialogContent>
            </Dialog>
        </div>
    );
}
