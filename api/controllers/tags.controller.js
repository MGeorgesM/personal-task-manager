const { Tag } = require('../models/tag.model');

const createTag = async (req, res) => {
    const { title, color } = req.body;
    const userId = req.user._id;

    try {
        const createdTag = await Tag.create({ title, color, owner: userId });
        return res.status(201).json(createdTag);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while creating tag' });
    }
};

const getTags = async (req, res) => {
    const userId = req.user._id;

    try {
        const tags = await Tag.find({ owner: userId });
        return res.status(200).json(tags);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while fetching tags' });
    }
};

const updateTag = async (req, res) => {
    const id = req.params.id;
    const { title, color } = req.body;

    try {
        const tag = await Tag.findByIdAndUpdate(id, { title, color }, { new: true });
        !tag && res.status(404).json({ error: 'Tag not found' });
        return res.status(200).json(tag);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while updating tag' });
    }
};

const deleteTag = async (req, res) => {
    const id = req.params.id;
    const userId = req.user._id;

    try {
        const deletedTag = await Tag.findOneAndDelete({ _id: id, owner: userId });
        !deletedTag && res.status(404).json({ error: 'Tag not found' });
        return res.status(200).json(deletedTag);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while deleting tag' });
    }
};

module.exports = { createTag, getTags, updateTag, deleteTag };
