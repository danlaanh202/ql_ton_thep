const PersonModel = require("../models/Person.model");
const PeopleServices = require("../services/PeopleServices");

class PersonController {
  async createPerson(req, res) {
    const newPerson = new PersonModel({
      ten_khach_hang: req.body.ten_khach_hang,
      so_dien_thoai: req.body.so_dien_thoai,
      dia_chi: req.body.dia_chi,
      so_tien_no: 0,
      tong_tien_mua: 0,
    });
    try {
      const savedPerson = await newPerson.save();
      return res.status(200).json(savedPerson);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getPeopleWithSearchQuery(req, res) {
    try {
      const findedPeople = await PeopleServices.getPeopleWithSearchQuery(
        req.query.ten_khach_hang,
        req.query._page || 1
      );
      return res.status(200).json(findedPeople);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getPeople(req, res) {
    try {
      const people = await PersonModel.find({});
      return res.status(200).json(people);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getPeopleWithPagination(req, res) {
    try {
      const docs = await PeopleServices.getPeopleWithPaginate(
        req.query._page || 1,
        req.query._limit || 10
      );
      return res.status(200).json(docs);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new PersonController();
