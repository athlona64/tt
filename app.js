//โจทย์ lesson2 
//ให้ทำการ เพิ่มหนังสือเข้า ไปใน collection ชื่อ book จำนวน 10 เล่ม โดยทำการรับ parameter ชื่อหนังสือ มาจาก POSTMAN สามารถแก้ไขได้และลบได้ 
//ให้ทำ front-end แสดงชื่อหนังสือ จากการ ดึงจาก cloud firestore ออกมาด้วย
//โครงสร้าง book 
/**
{
	bookName:,
	created_time:,
	author:,
	page:
}
**/



const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var admin = require("firebase-admin");
var serviceAccount = require("./configfirebase.json");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


app.get('/test', function(req,res){
res.json({statusCode:200});
});
app.get('/deleteBook', function(req, res){
const db = admin.firestore();

const book = db.collection('book').doc('N1');

let getDoc = book.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());

      db.collection('backup-book').doc('N1').set(doc.data())
      .then(result =>{
      	db.collection('book').doc('N1').delete();
      });
      // res.json({statusCode:200 , result:doc.data()});
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });

});
app.get('/getBook', function(req, res){

const db = admin.firestore();

const book = db.collection('book').doc('uyafsFO0UUeUWk4Ex62b');

let getDoc = book.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
      res.json({statusCode:200 , result:doc.data()});
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });
});

app.get('/setBook', function(req, res){
	let bookName = "N3";
	let created_time = "2020-06-03";
	let author = "PRAPAT P."
	let license = "MIT";
	let page = "500";

	const db = admin.firestore();

	let data = {
		bookName: bookName,
		created_time: created_time

	};

	// Add a new document in collection "cities" with ID 'LA'
	let setDoc = db.collection('book').doc('lN9eXyNlNF6dq2mxY1GT').set(data)
		.then(result => {
			console.log(result);
			res.json({statusCode:200, result:result.id});
		}).catch(e =>{
			console.log(e);
			res.json({statusCode:200 , result: 'error'});
		});

});


app.listen(3000)