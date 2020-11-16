const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const url = require('url');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', (req, res, next) => {
    let data  = [{
        company_name:"Amazon",
        position:"Software Engineer",
        status: "Coding Test",
        link: "https://account.amazon.jobs/en-US",
        date:"10/23/2020"
    },
    {
        company_name:"Google",
        position:"Full Stack Developer",
        status: "Applied",
        link: "https://account.amazon.jobs/en-US",
        date:"10/23/2020"
    },
    {
        company_name:"Microsoft",
        position:"Web Developer",
        status: "Interview",
        link: "https://account.amazon.jobs/en-US",
        date:"10/22/2020"
    },
    {
        company_name:"Apple",
        position:"Web Developer",
        status: "Applied",
        link: "https://account.amazon.jobs/en-US",
        date:"10/22/2020"
    },
    {
        company_name:"Amazon",
        position:"Software Engineer",
        status: "Coding Test",
        link: "https://account.amazon.jobs/en-US",
        date:"10/22/2020"
    },
    {
        company_name:"Amazon",
        position:"Software Engineer",
        status: "Coding Test",
        link: "https://account.amazon.jobs/en-US",
        date:"10/22/2020"
    },
    {
        company_name:"Amazon",
        position:"Software Engineer",
        status: "Coding Test",
        link: "https://account.amazon.jobs/en-US",
        date:"10/22/2020"
    },
    {
        company_name:"Amazon",
        position:"Software Engineer",
        status: "Coding Test",
        link: "https://account.amazon.jobs/en-US",
        date:"10/22/2020"
    },
    {
        company_name:"Amazon",
        position:"Software Engineer",
        status: "Coding Test",
        link: "https://account.amazon.jobs/en-US",
        date:"10/22/2020"
    },
    {
        company_name:"Amazon",
        position:"Software Engineer",
        status: "Coding Test",
        link: "https://account.amazon.jobs/en-US",
        date:"10/22/2020"
    },
    ]
    let position = req.query.position;
    let status = req.query.status;
    var response = [];
    
    for(i=0; i<data.length;i++){
        if(position == null || position == undefined){
            if(status == data[i].status)
                response.push(data[i]);
            
        }
        else{
            if(position == data[i].position)
                response.push(data[i]);
        }

            
    }
    res.status(200);
    res.header("Access-Control-Allow-Origin", "*");
    if((position == null || position == undefined) && (status == null || status == undefined))
        res.json(data);
    else
	    res.json(response);
	res.end();
});

module.exports = router