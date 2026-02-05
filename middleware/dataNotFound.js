const dataNotFound = (res, data, message = "data Not Found") => {
  if (!data || (Array.isArray(data) && data.length == 0)) {
    return res.status(404).json({ sussec: false, message });
    }

    return false
};

module.exports = dataNotFound
