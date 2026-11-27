const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

exports.main = async (event) => {
  console.log('[hello] called with event:', event);
  return {
    ok: true,
    message: 'Hello from cloud function',
    env: cloud.getWXContext().ENV,
    time: new Date().toISOString(),
  };
};
