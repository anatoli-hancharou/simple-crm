import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  register = async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    const oldUser = await this.authService.getUserByEmail(email);

    if (oldUser) {
      return res.status(409).send("User already exists. Please login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await this.authService.register({
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    return res.status(201).json(user);
  };

  login = async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    const user = await this.authService.getUserByEmail(email)

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user.id, email },
        process.env.SECRET_KEY,
        {
          expiresIn: "8h",
        }
      );

      return res.status(200).json({email: user.email, token});
    }

    return res.status(400).send("Invalid Credentials");
  }
}

export default AuthController;