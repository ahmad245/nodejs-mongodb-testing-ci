const AWS=require('aws-sdk');
module.exports.s3AWS=()=>{
    const s3=new AWS.S3({
        accessKeyId:process.env.accessKeyIdAWS,
        secretAccessKey:process.env.secretAccessKeyAWS,
        signatureVersion: process.env.signatureVersionAWS,
        region: process.env.regionAWS,
       // endpoint:"apigateway.eu-west-3.amazonaws.com"
         
    
    });
    return s3;
}