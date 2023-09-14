import User from '../../db/models/User.js';

class AuthService {

  getUserByEmail = async (email) => {
    const user = await User.findOne({ where: { email: email } });
    return user;
  }

  register = async (user) => {
    const newUser = await User.create(user);
    return newUser;
  };
}

export default AuthService;