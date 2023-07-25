import QuestionModal from "../models/testq";

const questionController = {
    // get a specific question and its answers
    getQuestion: async (req, res) => {
      try {
        const question = await QuestionModal.findById(req.params.id).populate('answers');
        res.json(question);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
    }
  };