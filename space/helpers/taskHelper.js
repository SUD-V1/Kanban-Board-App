const createResponse = (message, status, data) => {
    return {
      message: message || "",
      status: status || "",
      data: data || "",
    };
  };
  
  module.exports = createResponse;
  