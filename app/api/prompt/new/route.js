import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//Створюєм маршрут в next.js
export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json(); //витягуєм дані які ми передали через POST запит

  try {
    //Підключаємось до бази даних
    await connectToDB();
    //Cтворюєм новий Prompt
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    //Викликаєм новий Prompt і зберігаєм в базі даних
    await newPrompt.save();

    //Тепер повертаєм нову відповідь і статус 201
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    //Повертаєм відповідь, що не вдалось створити новий Prompt і статус 500
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
