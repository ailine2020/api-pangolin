const router = new require("express").Router();
const PangolinModel = require("../models/pangolin");

router.get("/", async (req, res, next) => {
    try {
        const pangolins = await PangolinModel.find().limit(100).populate("friends");
        res.json(pangolins);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const pangolins = await PangolinModel.findById(req.params.id).populate("friends");
        res.json(pangolins);
    } catch (err) {


        
        next(err);
    }
});
router.patch("/:id", async (req, res, next) => {
    try {
        const updatedPangolin = await PangolinModel.findByIdAndUpdate(
            req.params.id,
            req.body, {
                new: true
            }
        );
        res.json(updatedPangolin);
    } catch (err) {
        next(err);
    }
});

module.exports = router;