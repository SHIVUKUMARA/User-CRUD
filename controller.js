const User = require("./model");

// create
const createUser = async (req, res) => {
  try {
    const { email, mobile } = req.body;

    // validate email and mobile number
    let existEmail = await User.findOne({ email });
    let existMobile = await User.findOne({ mobile });

    if (existEmail) {
      return res
        .status(400)
        .json({ status: false, msg: "Email already exist" });
    } else if (existMobile) {
      return res
        .status(400)
        .json({ status: false, msg: "Mobile number already exist" });
    } else {
      // store the data
      let newUser = await User.create(req.body);
      return res.status(201).json({
        status: true,
        msg: "User created successfully",
        data: newUser,
      });
    }
  } catch (error) {
    return res.status(500).json({ status: false, msg: error.message });
  }
};
// read all
const readAllUser = async (req, res) => {
  try {
    let users = await User.find({});
    return res.status(200).json({ length: users.length, users });
  } catch (error) {
    return res.status(500).json({ status: false, msg: error.message });
  }
};
// read single
const readSingleUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ status: false, msg: "Requested User not found" });
    } else {
      return res.status(200).json({ user });
    }
  } catch (error) {
    return res.status(500).json({ status: false, msg: error.message });
  }
};
// update
const updateUser = async (req, res) => {
  try {
    let id = req.params.id;
    let existUser = await User.findById(id);
    if (!existUser)
      return res
        .status(404)
        .json({ status: false, msg: "Requested User not found" });

    await User.findByIdAndUpdate({ _id: id }, req.body);

    res.status(200).json({ status: true, msg: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({ status: false, msg: error.message });
  }
};
// delete
const deleteUser = async (req, res) => {
  try {
    let id = req.params.id;
    let existUser = await User.findById(id);
    if (!existUser)
      return res
        .status(404)
        .json({ status: false, msg: "Requested User not found" });

    await User.findByIdAndDelete(id);

    res.status(200).json({ msg: "User deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ status: false, msg: error.message });
  }
};

module.exports = {
  createUser,
  readAllUser,
  readSingleUser,
  updateUser,
  deleteUser,
};
