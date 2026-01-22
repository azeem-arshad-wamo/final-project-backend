import User from "../models/User.js";

export async function createNewUser(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    console.log(`First Name: ${firstName}`);
    console.log(`Last Name: ${lastName}`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);

    if (!firstName || !lastName || !email || !password)
      throw new Error("Incomplete Information");

    const existing = await User.findOne({
      where: {
        email: email,
      },
    });

    if (existing) throw new Error("User already exists");

    const result = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    console.log("RESULT");
    console.log(result);

    res.status(200).json({
      message: "User Created Successfully",
      user: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
