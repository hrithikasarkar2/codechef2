var express       = require('express');
var bodyParser    = require('body-parser');
const mysql_conn   =  require('./db_connection/db_connection');
const bcrypt		=require('bcrypt');
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use("/public", express.static('public')); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,resp){

	resp.render('first')   
});
app.post('/reg',function(req,resp){

    var email =req.body.email
    var name =req.body.Name
    var contact =req.body.mobile
    var password1=bcrypt.hashSync(req.body.password,10);
    console.log(email+name+contact+password1)
	console.log(req.body)
	var insert_data ={
		NAME:name,
		EMAIL_ID:email,
		MOBILE_NO:contact,
		PASSWORD:password1

}
	var query = "insert into codechef_table set ?"
	mysql_conn.query(query,insert_data,function(err){
		if(!err){
			console.log('data inserted')
		}else{
             console.log(err);
		}
	})
	resp.render('index')

   
})

app.get('/reg',function(req,resp){

resp.render('signup')

})


app.listen('96',()=>console.log('Server running at port 96'));