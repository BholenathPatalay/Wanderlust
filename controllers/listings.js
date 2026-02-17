const Listing = require("../models/listing");
const { categories } = require("../init/categories");


// ================= INDEX =================

module.exports.index = async (req, res) => {

    const allListings = await Listing.find({})
        .populate("category")
        .populate("owner");

    res.render("listings/index.ejs", { allListings });

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



// ================= FILTER CATEGORY =================

module.exports.filterByCategory = async (req, res) => {

    const categoryName = req.params.category;

    const allListings = await Listing.find({})
        .populate("category")
        .populate("owner");

    const filteredListings = allListings.filter(

        listing => listing.category?.name === categoryName

    );

    res.render("listings/index.ejs", {

        allListings: filteredListings,

        category: categoryName

    });

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
