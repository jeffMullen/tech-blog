const checkId = (req, res) => {
    if (req.session.userId !== parseInt(req.params.id)) {
        res.redirect('/login');
        return;
    }
}

module.exports = checkId;