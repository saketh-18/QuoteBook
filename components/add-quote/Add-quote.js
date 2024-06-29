"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
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

export default function AddQuote({quote , author , setQuote , setAuthor , handleSaveChanges}) {
  return (
    <div className="ml-4 mt-4 ">
    <Dialog asChild className="bg-white">
     <DialogTrigger className="text-2xl font-semibold p-2 bg-white rounded-lg">Add Quote</DialogTrigger>
     <DialogContent className="bg-white">
         <DialogHeader>
         <DialogTitle>Add a Quote</DialogTitle>
             <Input className="border-2" name="quote" placeholder="type the quote" value={quote} onChange={(e) => {setQuote(e.target.value)}}/>
             <Input className="border-2" name="author" placeholder="enter the name of author" value={author} onChange={(e) => {setAuthor(e.target.value)}}/>
         </DialogHeader>
         <DialogClose asChild>
             <Button className="bg-black text-xl text-white" onClick={handleSaveChanges}>Save Changes</Button>
         </DialogClose>
     </DialogContent>
     </Dialog>
   </div>           
  )            
}
