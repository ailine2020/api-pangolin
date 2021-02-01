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

router.patch("/:id/add-friend", async (req, res, next) => {
    var friend = {
        ...req.body
    };
    try {
        const addFriend = await pangolinModel.findByIdAndUpdate(req.params.id, {
            $push: {
                friends: friend._id
            }
        }, {
            new: true
        });
        res.json(addFriend);
        console.log('addFriend', addFriend);
    } catch (err) {
        next(err)
    }
});
router.patch("/:id/delete-friend", async (req, res, next) => {
    var friend = {
        ...req.body
    };
    try {
        const deleteFriend = await pangolinModel.findByIdAndUpdate(req.params.id, {
            $pull: {
                friends: friend._id
            }
        }, {
            new: true
        });
        res.json(deleteFriend);
        console.log('deleteFriend', deleteFriend);
    } catch (err) {
        next(err)
    }
});

module.exports = router;