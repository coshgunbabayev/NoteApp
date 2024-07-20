import Note from '../models/noteModel.js';

async function getNotes(req, res) {
    let notes = await Note.find({ visibility: 'public' })
        .populate('user', '-_id -password -__v -email');

    notes = notes.map(note => {
        const noteObj = note.toObject();
        noteObj.isOwner = note.user.username === req.user.username;
        return noteObj;
    });

    res.status(200).json({
        success: true,
        notes
    });
};

async function createNote(req, res) {
    try {
        const { title, content, visibility } = req.body;
        const note = await Note.create({
            user: req.user._id,
            title,
            content,
            visibility
        });

        res.status(201).json({
            success: true
        });
    } catch (err) {
        let errors = new Object();

        if (err.name === "ValidationError") {
            Object.keys(err.errors).forEach(key => {
                errors[key] = err.errors[key].message;
            });
        };

        res.status(400).json({
            success: false,
            errors
        });
    };
};

async function getNote(req, res) {
    let note;
    try {
        note = await Note.findById(req.params.id)
            .populate('user', '-_id -password -__v -email');
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Note not found'
        });
    };

    if (!note) {
        return res.status(400).json({
            success: false,
            message: 'Note not found'
        });
    };

    if (note.visibility === 'private' && note.user.username !== req.user.username) {
        return res.status(400).json({
            success: false,
            message: 'Note not found'
        });
    };
    
    note = note.toObject();
    note.isOwner = note.user.username === req.user.username

    res.status(200).json({
        success: true,
        note
    });
};

async function deleteNote(req, res) {
    let note;

    try {
        note = await Note.findById(req.params.id);
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Note not found'
        });
    };

    if (!note) {
        return res.status(400).json({
            success: false,
            message: 'Note not found'
        });
    };

    if (note.visibility === 'private' && !note.user.equals(req.user._id)) {
        return res.status(400).json({
            success: false,
            message: 'Note not found'
        });
    };

    if (!note.user.equals(req.user._id)) {
        return res.status(400).json({
            success: false,
            message: "Note is not yours"
        });
    };

    await Note.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true
    });
};

async function isLikedNote(req, res) {
    let note;
    try {
        note = await Note.findById(req.params.id);
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Note not found'
        });
    };

    if (!note) {
        return res.status(400).json({
            success: false,
            message: 'Note not found'
        });
    };

    if (note.visibility === 'private' && !note.user.equals(req.user._id)) {
        return res.status(400).json({
            success: false,
            message: 'Note not found'
        });
    };

    res.status(200).json({
        success: true,
        isLiked: note.likes.includes(req.user._id)
    });
};

async function likeNote(req, res) {
    let note;
    try {
        note = await Note.findById(req.params.id);
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Note not found'
        });
    };

    if (!note) {
        return res.status(400).json({
            success: false,
            message: 'Note not found'
        });
    };

    if (note.visibility === 'private' && !note.user.equals(req.user._id)) {
        return res.status(400).json({
            success: false,
            message: 'Note not found'
        });
    };

    if (note.likes.includes(req.user._id)) {
        return res.status(400).json({
            success: false,
            message: 'You have already liked this note'
        });
    };

    note.likes.push(req.user._id);
    await note.save();

    res.status(200).json({
        success: true
    });
};

async function unlikeNote(req, res) {
    let note;
    try {
        note = await Note.findById(req.params.id);
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Note not found'
        });
    };

    if (!note) {
        return res.status(400).json({
            success: false,
            message: 'Note not found'
        });
    };

    if (note.visibility === 'private' && !note.user.equals(req.user._id)) {
        return res.status(400).json({
            success: false,
            message: 'Note not found'
        });
    };

    if (!note.likes.includes(req.user._id)) {
        return res.status(400).json({
            success: false,
            message: 'You have not liked this note'
        });
    };

    const index = note.likes.indexOf(req.user._id);
    note.likes.splice(index, 1);
    await note.save();

    res.status(200).json({
        success: true
    });
};

async function getNoteLikes(req, res) {
    let note;
    try {
        note = await Note.findById(req.params.id)
            .populate('likes', '-_id -__v -email -password');
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Note not found'
        });
    };

    if (!note) {
        return res.status(400).json({
            success: false,
            message: 'Note not found'
        });
    };

    if (note.visibility === 'private' && !note.user.equals(req.user._id)) {
        return res.status(400).json({
            success: false,
            message: 'Note not found'
        });
    };

    res.status(200).json({
        success: true,
        users: note.likes,
    });
};

export {
    getNotes,
    createNote,
    getNote,
    deleteNote,
    isLikedNote,
    likeNote,
    unlikeNote,
    getNoteLikes
};