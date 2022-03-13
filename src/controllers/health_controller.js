

function health (req, res){
    res.send({ success: 'Container is up',
    });
}

module.exports = {
    health
};
