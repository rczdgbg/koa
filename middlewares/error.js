module.exports =  errorHandle = (ctx, next) => {
  return next().catch((err) => {
    console.log(err,"___________")
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        error: err.originalError ? err.originalError.message : err.message,
      };
    } else {
      throw err;
    }
  });
}
