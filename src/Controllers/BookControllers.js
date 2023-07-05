const bookmodel = require("../Models/bookModel");

const createBook = async (req,res)=>{
    const {id, title, author, nofunits, category} = req.body;
    const newbook = new bookmodel({
        id : id,
        title : title,
        author : author,
        nofunits : nofunits,
        category : category,
        userId : req.userId
    });
    try {
        await newbook.save();
        res.status(201).json(newbook);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"})
    }
}

const updateBook = async (req,res)=>{
    const idd = req.params.id;
    const {id, title, author, nofunits, category} = req.body;
    const newbook = {
        id : id,
        title : title,
        author : author,
        nofunits : nofunits,
        category : category
    }
    try {
        await bookmodel.findByIdAndUpdate(idd,newbook,{new:true});
        res.status(200).json(newbook)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong"})
    }
}

const deleteBook = async (req,res)=>{
    const idd = req.params.id;
    try {
        const bookdelete = await bookmodel.findByIdAndRemove(idd);
        res.status(202).json(bookdelete); 
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
    
}

const getBook = async (req,res)=>{
    try {
        const books = await bookmodel.find({userId: req.userId});
        res.status(200).json(books);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"})

    }
}

module.exports={
    createBook,
    updateBook,
    deleteBook,
    getBook
}