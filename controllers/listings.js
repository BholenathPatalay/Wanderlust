const Listing = require("../models/listing");
const Category = require("../models/category");
const { categories } = require("../init/categories");


// ================= INDEX =================

module.exports.index = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = 8;

    const selectedCategory = req.query.category || "";
    const search = req.query.search || "";
    const minPrice = req.query.minPrice || "";
    const maxPrice = req.query.maxPrice || "";


    let filter = {};

    if (selectedCategory) {

        const categoryDoc = await Category.findOne({

            name: selectedCategory

        });

        if (categoryDoc) {

            filter.category = categoryDoc._id;

        }

    }

    if(search){
        filter.$or = [
            {title: {$regex: search, $options: "i"}},
            {location: {$regex: search, $options: "i"}},
            {country: {$regex: search, $options: "i"}},
            {description: {$regex: search, $options: "i"}},
        ]
    }

    if(minPrice || maxPrice) {
        filter.price = {};
        if(minPrice) filter.price.$gte = Number(minPrice);
        if(maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const totalListings = await Listing.countDocuments(filter);
    const totalPages = Math.ceil(totalListings/limit);
    
    const allListings = await Listing.find(filter)
        .populate("category")
        .populate("owner")
        .skip((page - 1) * limit)
        .limit(limit);

    res.render("listings/index.ejs", { allListings, totalPages, page, selectedCategory, search, minPrice, maxPrice});

};



// ================= NEW FORM =================

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};



// ================= SHOW =================

module.exports.showListing = async (req, res) => {

    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate("category")
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })

        .populate("owner");


    if (!listing) {
        req.flash("error", "Listing you requested does not exist");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", {
        listing,
        mapToken: process.env.MAP_TOKEN

    });

};



// ================= CREATE =================

module.exports.createListing = async (req, res) => {

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;

    newListing.image = { url, filename };

    await newListing.save();

    req.flash("success", "New Listing Created!");

    res.redirect("/listings");

};




// ================= EDIT FORM =================

module.exports.renderEditForm = async (req, res) => {

    let { id } = req.params;

    const listing = await Listing.findById(id)
        .populate("category");

    if (!listing) {

        req.flash("error", "Listing does not exist");

        return res.redirect("/listings");

    }

    res.render("listings/edit.ejs", { listing });

};



// ================= UPDATE =================

module.exports.updateListing = async (req, res) => {

    let { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(

        id,

        { ...req.body.listing },

        { new: true }

    );



    if (typeof req.file !== "undefined") {

        let url = req.file.path;

        let filename = req.file.filename;

        listing.image = { url, filename };

        await listing.save();

    }


    req.flash("success", "Listing Updated!");

    res.redirect(`/listings/${id}`);

};



// ================= DELETE =================

module.exports.destroyListing = async (req, res) => {

    let { id } = req.params;

    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing Deleted!");

    res.redirect("/listings");

};
