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
        console.log(req.body);
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

async function deleteNote(req, res) {
    let note;

    try {
        note = await Note.findById(req.params.id);
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Note not found"
        });
    };

    if (!note) {
        return res.status(400).json({
            success: false,
            message: "Note not found"
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

export {
    getNotes,
    createNote,
    deleteNote,
};