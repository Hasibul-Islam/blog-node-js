const path = require('path')
const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now()+'.jpg')
	}
});

const upload = multer({ 
    
    storage: storage ,
    fileFilter: function(req,file,callback){
        if(
            file.mimetype == "image/png" || file.mimetype == "image/jpg"
        )
            callback(null,true)
        else{
            console.log('Only jpg or png file supports')
            callback(null,false)
        }
    },
    limits:{
        fileSize: 1024 * 1024 *2
    }

},);

module.exports = upload
