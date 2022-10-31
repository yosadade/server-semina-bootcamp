// import model category
const res = require("express/lib/response");
const Categories = require("./model");

// buat function create
const create = async (req, res, next) => {
  try {
    // membuat categories baru menggunakan data dari `name`
    const { name } = req.body;

    // simpan Category yang baru dibuat ke MongoDB
    const result = await Categories.create({ name });

    // berikan response kepada client dengan mengembalikan product yang baru dibuat
    res.status(201).json({
      data: result,
    });
  } catch (err) {
    // jika terjadi kesalahan kemudian gunakan method `next` agar Express memproses error tersebut
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await Categories.find().select("_id name");
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Categories.findOne({ _id: id });
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const result = await Categories.findByIdAndUpdate(
      { _id: id },
      { name },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Categories.findByIdAndRemove(id);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(err);
  }
};

// Export fungsi create pada controller categories
module.exports = {
  index,
  find,
  create,
  update,
  destroy,
};
