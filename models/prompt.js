import { Schema, model, models } from "mongoose"; //Допомагає взаємодіяти з базою данних

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },

  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
});

//Перевіряєм чи існує модель, якщо ні то створюємо нову модель

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;

//Тепер  MongoDb і Mongoose знають, як мають виглядати наші дані в базі даних👍
