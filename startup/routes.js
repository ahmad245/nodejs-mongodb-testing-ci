const express=require('express');
const bootcampsRoute=require('./../routes/bootcamps');
const coursesRoute=require('./../routes/course');
const authRoute=require('./../routes/auth');
const userRoute=require('./../routes/user');
const reviewRoute=require('./../routes/review');
const uploadRoute=require('./../routes/upload');
const examRoute=require('./../routes/exam');
const questionRoute=require('./../routes/question');
const submissionsRoute=require('./../routes/submissions');
const error=require('../middelware/errorHandling');

module.exports=(app)=>{
    app.use(express.json())
    app.use('/api/v1/bootcamps',bootcampsRoute);
    app.use('/api/v1/courses',coursesRoute);
    app.use('/api/v1/auth',authRoute);
    app.use('/api/v1/users', userRoute);
    app.use('/api/v1/reviews', reviewRoute);
    app.use('/api/v1/upload', uploadRoute);
    app.use('/api/v1/exams', examRoute);
    app.use('/api/v1/questions', questionRoute);
    app.use('/api/v1/submissions', submissionsRoute);
    
    app.use(error);
}