const reviewRepository = require('../repositories/ReviewRepository');
const Bootcamp  = require("../repositories/BootcampRepository")

// @desc      Get reviews
// @route     GET /api/v1/reviews
// @route     GET /api/v1/bootcamps/:bootcampId/reviews
// @access    Public
exports.getAll = async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await reviewRepository.find({ bootcamp: req.params.bootcampId }).cache({key:req.params.bootcampId});

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
};

// @desc      Get single review
// @route     GET /api/v1/reviews/:id
// @access    Public
exports.getById = async (req, res, next) => {
  const review = await reviewRepository.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description'
  }).cache({key:req.params.id});

  if (!review) {
    return  res.status(404).json({ success: false ,error: `No review found with the id of ${req.params.id}`});
    
  }

  res.status(200).json({
    success: true,
    data: review
  });
};

// @desc      Add review
// @route     POST /api/v1/bootcamps/:bootcampId/reviews
// @access    Private
exports.post = async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);


  if (!bootcamp) {
    
    return  res.status(404).json({ success: false ,error: `No bootcamp with the id of ${req.params.bootcampId}`});
    
  }

  const review = await reviewRepository.create(req.body);

  res.status(201).json({
    success: true,
    data: review
  });
};

// @desc      Update review
// @route     PUT /api/v1/reviews/:id
// @access    Private
exports.put = async (req, res, next) => {
  let review = await reviewRepository.findById(req.params.id);

  if (!review) {
    return  res.status(404).json({ success: false ,error: `No review with the id of ${req.params.id}`});
    
  }

  // Make sure review belongs to user or user is admin
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return  res.status(403).json({ success: false ,error: `Not authorized to update review`});
    
  }

  review = await reviewRepository.update(req.params.id, req.body);

// await review.save();

  res.status(200).json({
    success: true,
    data: review
  });
};

// @desc      Delete review
// @route     DELETE /api/v1/reviews/:id
// @access    Private
exports.remove = async (req, res, next) => {
  const review = await reviewRepository.findById(req.params.id);

  if (!review) {
    return  res.status(404).json({ success: false ,error: `No review with the id of ${req.params.id}`});
    
  }

  // Make sure review belongs to user or user is admin
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return  res.status(403).json({ success: false ,error: `Not authorized to update review`});
    
  }

  await reviewRepository.remove(review._id);

  res.status(200).json({
    success: true,
    data: {}
  });
};