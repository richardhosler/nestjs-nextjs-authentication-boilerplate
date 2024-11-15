require('dotenv').config({ path: process.cwd() + '/../../.env' });

export default () => ({
  secret: process.env.SECRET,
});
