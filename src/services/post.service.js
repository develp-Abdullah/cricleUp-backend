const httpStatus = require('http-status');
const { Post } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Post
 * @param {Object} PostBody
 * @returns {Promise<Post>}
 */
const createPost = async (PostBody) => {
  return Post.create(PostBody);
};

/**
 * Query for Posts
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPosts = async (filter, options) => {
  const Posts = await Post.paginate(filter, options);
  return Posts;
};

/**
 * Get Post by id
 * @param {ObjectId} id
 * @returns {Promise<Post>}
 */
const getPostById = async (id) => {
  return Post.findById(id);
};

/**
 * Update Post by id
 * @param {ObjectId} postId
 * @param {Object} updateBody
 * @returns {Promise<Post>}
 */
const updatePostById = async (postId, updateBody) => {
  const postUpdate = await getPostById(postId);
  if (!postUpdate) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  Object.assign(postUpdate, updateBody);
  await postUpdate.save();
  return postUpdate;
};

/**
 * Delete Post by id
 * @param {ObjectId} postId
 * @returns {Promise<Post>}
 */
const deletePostById = async (postId) => {
  const postDelete = await getPostById(postId);
  if (!postDelete) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  await postDelete.remove();
  return postDelete;
};

module.exports = {
  createPost,
  queryPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
