const router = new require("express").Router();
const pangolinModel = require("../models/pangolin");
const bcrypt = require("bcrypt");


router.get("/", async (req, res, next) => {
    try {
        const pangolins = await pangolinModel.find().limit(100).populate("friends");
        res.json(pangolins);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const pangolins = await pangolinModel.findById(req.params.id).populate("friends");
        res.json(pangolins);
    } catch (err) {



        next(err);
    }
});
router.patch("/:id", async (req, res, next) => {
    var pangolin = {
        ...req.body
    };
    try {
        const newPassword = await bcrypt.hash(pangolin.password, 10);
        pangolin.password = newPassword;
        const updatedPangolin = await pangolinModel.findByIdAndUpdate(req.params.id, pangolin, {
            new: true
        });
        res.json(updatedPangolin);
    } catch (err) {
        next(err);
    }
});

module.exports = router;