//errorMaster.js


const MongoCodes = {

  DupKey: 11000
}


const handle = (err) => {

  if(err.name === 'MongoError') {

    if(err.code === MongoCodes.DupKey) {

      return new Error(`Entered ${Object.keys(err.keyValue)[0]} already exists`);
    }
  } else {
    
    return err;
  }
}

module.exports.handle = handle;
