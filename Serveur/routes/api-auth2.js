const router = new require("express").Router();
const bcrypt = require("bcrypt");
const pangolinModel = require("../models/pangolin");
const auth = require("../auth/index");


router.get("/signout", (req, res) => {
    const x = req.session.destroy();
    res.json(x);
});

router.get("/get-pangolin-by-token", (req, res) => {
    try {
        const pangolin = auth.decodeToken(req.header("x-authenticate"));
        const pangolinId = pangolin.infos._id;
        res.redirect("/api/pangolin/" + pangolinId);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.post("/signin", async (req, res, next) => {
    const pangolinInfos = req.body;
    if (!pangolinInfos.username || !pangolinInfos.password) {
        res.status(401).json({
            msg: "Identifiants incorrects",
            level: "error",
        });
    }
    pangolinModel
        .findOne({
            username: pangolinInfos.username
        })
        .then((pangolin) => {
            if (!pangolin) {
                return res.status(401).json({
                    msg: "Identifiants incorrects",
                    level: "error",
                });
            }
            const checkPassword = bcrypt.compareSync(
                pangolinInfos.password,
                pangolin.password
            );

            if (checkPassword === false) {
                return res.status(401).json({
                    msg: "Identifiants incorrects",
                    level: "error",
                });
            }

            const {
                _doc: clone
            } = {
                ...pangolin
            };
            delete clone.password;
            req.session.currentUser = clone;

            const token = auth.createToken(pangolin, req.ip);

            return res
                .header("x-authenticate", token)
                .status(200)
                .send({
                    pangolin: clone,
                    token,
                    msg: "logged in !",
                    level: "success"
                });
        })
        .catch(next);
});

router.post("/signup", async (req, res, next) => {
    const pangolin = req.body;

    if (!pangolin.username || !pangolin.password || !pangolin.race || !pangolin.famille || !pangolin.nourriture || !pangolin.age) {
        return res.status(422).json({
            msg: "Merci de remplir tous les champs requis.",
            level: "warning",
        });
    } else {
        try {
            const previousPangolin = await pangolinModel.findOne({
                username: pangolin.username
            });
            console.log(previousPangolin);
            if (previousPangolin) {
                return res.status(422).json({
                    msg: "Désolé, cet username n'est pas disponible.",
                    level: "warning",
                });
            }

            const salt = bcrypt.genSaltSync(10);
            const hashed = bcrypt.hashSync(pangolin.password, salt);
            pangolin.password = hashed;

            await pangolinModel.create(pangolin);
            return res.status(200).json({
                msg: "signed up !",
                level: "success"
            });
        } catch (err) {
            next(err);
        }
    }
});

module.exports = router;