const isAdmin = (req, res, next) => {
    if (!req.user || req.user.isAdmin === false) {
      return next('Sorry, admins only!')
    }
    next()
  }

  const isOwner = (req, res, next) => {
    if (!req.user || req.user.id !== user.id) {
      return next('Sorry, you are not the owner!')
    }
    next()
  }

  module.exports = {
    isAdmin,
    isOwner
  }
